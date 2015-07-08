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
