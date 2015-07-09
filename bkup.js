var mongoose = require('mongoose');
var async = require('async');

var mahaller = require('./blocks.json');

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
    async.each(mahaller, function(mahal, cb) {

      if (mahal.id == looptest) {
        mahal.saved = true;
        cb('lez go');
      } else {
        cb(null);
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
