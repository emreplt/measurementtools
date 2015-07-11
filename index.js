var mongoose = require('mongoose');
var async = require('async');

var mahaller = require('./blocks.json');

var mahalModel = require('./mahal').model;

mongoose.connect('mongodb://localhost/measurement');
mongoose.set('debug', true);


var calls = [];

/*
  pumping asyncronously
*/

function init() {
  var looptest = 0;
  async.whilst(function() {
    return calls.length < mahaller.length;
  }, function(callback) {
    looptest++;
    async.each(mahaller, function(mahal, cb) {
      if (mahal.saved) {
        return cb(); // please check back
      }
      if (mahal.ustMahal === null) {
        var mahalBaba = new mahalModel({
          adi: mahal.adi
        });
        mahal.saved = mahalBaba.id;
        calls.push(function(cbpush) {
          mahalBaba.save(cbpush);
        });
        cb(true);
      } else {
        async.filter(mahaller, function(babamahal, cbf) {
          return cbf(babamahal.saved && babamahal.id == mahal.ustMahal);
        }, function(results, err) {
          if (err) {
            throw err;
          }
          if (results.length > 0) {
            var mahalChild = new mahalModel({
              adi: mahal.adi,
              ustMahal: results[0].saved
            });
            mahal.saved = mahalChild.id;
            calls.push(function(cbpush) {
              mahalChild.save(cbpush);
            });
            cb(true);
          }
        });
      }

    }, function(err) {
      if (err) {
        callback();
      }
    });

  }, function(err) {
    console.log('err');
  });
}
init();

async.series(calls, function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log('FIN!');
  process.exit(0);
});
