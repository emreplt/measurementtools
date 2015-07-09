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


exports.model = mongoose.model('mahal', mahalSchema);
