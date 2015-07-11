var mongoose = require('mongoose');
var async = require('async');
var circularJSON = require('circular-json');

var mahaller = require('./blocks.json');

var mahalModel = require('./mahal').model;

mongoose.connect('mongodb://localhost/measurement');
mongoose.set('debug', true);


function init() {
  mahalModel.find({ustMahal:null}).exec(function (err, data) {
    if (err) {
      console.log(err);
    }
    var gelendata = data;
    console.log(JSON.stringify(data));
  });
}

init();
