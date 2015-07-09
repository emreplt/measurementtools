var mongoose = require('mongoose');
var async = require('async');

var mahaller = require('./blocks.json');

var mahalModel = require('./mahal').model;

mongoose.connect('mongodb://localhost/measurement');
mongoose.set('debug', true);


function init() {
  var looptest = 0;
  async.during(function(callback) {

    // testing begins

    async.filter(mahaller, function(mahal, cb) {
      return mahal.saved ? cb(true) : cb(false);
    }, function(results, err) {
      return callback(null, results.length !== mahaller.length);
    });

    // testing ends

  }, function(callback) {


    looptest++;
    async.forEachOf(mahaller, function(mahal, cb) {
      if (mahal.saved) cb(); // please check back
      if (mahal.ustMahal === null) {
        var mahalBaba = new mahalModel({
          adi: mahal.adi
        });
        mahalBaba.save(function (err, doc, cb) {
          mahal.saved = doc.id;
          console.log('did it');
          cb();
        });
      } else {
        async.filter(mahaller, function(babamahal, cbf) {
          return cbf(babamahal.id == mahal.ustMahal);
        }, function(results, err) {
          if (err) {
            throw err;
          }
          if (results > 0) {
            var mahalChild = new mahalModel({
              adi: mahal.adi,
              ustMahal: results[0].id
            });
            mahalChild.save(function (err, doc) {
               mahal.saved = doc.id;
               cb('child i gomdk');
            });
          }
        });
      }

    }, function(err) {
      console.log('callbacktayim eachSeriesin');
      callback();
    });

  }, function(err) {
    if (err) {
      throw err;
    }
    console.log('callbacktayim duringin');
    process.exit(0);
  });
}
init();
