var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var HistorySchema = new Schema({
  timeLogin: { type: Date, required:true },
  user: { type: Schema.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('History', HistorySchema);