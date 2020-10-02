var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = class User {
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
};

var UserSchema = new Schema({
    username: {type: String, maxlength: 20, required: true, unique: true},
    password: {type: String, maxlength: 70, required: true}
});

module.exports.UserModel = mongoose.model('User', UserSchema);