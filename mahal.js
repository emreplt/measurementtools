var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongid = Schema.Types.ObjectId;


var schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
};


mahalSchema = new Schema({
  adi: String,
  ustMahal: {
    type: mongid,
    ref: 'mahal'
  },
  _olusturan: {
    type: mongid,
    ref: 'user'
  }
}, schemaOptions);


mahalSchema.virtual('altMahaller').get(function() {
  var mahalModel = require('./mahal').model;
  return mahalModel.find({
    ustMahal: this._id
  }).exec(function(err, data) {
    return data;
  });
});

mahalSchema.methods.getAltMahaller = function () {
  var mahalModel = require('./mahal').model;
  return mahalModel.find({
    ustMahal: this._id
  }).exec(function(err, data) {
    return data;
  });
};

exports.model = mongoose.model('mahal', mahalSchema);
