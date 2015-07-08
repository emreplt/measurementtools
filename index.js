var mongoose = require('mongoose');
var async = require('async');

var mahaller = require('./blocks.json');

mongoose.connect('mongodb://localhost/measurement');
mongoose.set('debug', true);


function init() {
  var looptest = 0;
  async.during(function(callback) {
    var alliswell = true;
    async.each(mahaller, function(mahal, cbteach) {
      console.log(!mahal.saved);
      if (!mahal.saved) {
        alliswell = false;
        cbteach();
        return;
      }
      cbteach();
    }, function(err) {
      return callback(null, alliswell);
    });

  }, function(callback) {
    console.log('Im fired');
    async.eachSeries(mahaller, function(mahal, callbackic) {
      looptest++;
      if (mahal.id == looptest) {
        mahal.saved = true;
        console.log(looptest);
        console.log(mahaller);
        //callbackic();
      }
      callbackic();
    }, function(err) {
      if (err) {
        throw err;
      }
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
