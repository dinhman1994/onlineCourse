var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  userName: { type: String, required: true, maxlength: 30, unique: true },
  password: { type: String, required: true, maxlength: 30 },
  avatar: {type: String, maxlength: 100}
});

module.exports = mongoose.model('User', UserSchema);
