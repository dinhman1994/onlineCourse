var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  description: { type: String, required: false, maxlength: 300 },
  age: { type: Number, required: true },
  timeUp: { type: Date, required:true },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  password: { type: String, required: true, maxlength: 30 }
});

module.exports = mongoose.model('Image', ImageSchema);
