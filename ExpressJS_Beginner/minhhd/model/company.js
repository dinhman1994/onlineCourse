var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {type: String, required: true, maxlength: 100},
    address: {type: String},
    phoneNumber: {type: String}
});

module.exports.CompanyModel = mongoose.model('Company', CompanySchema);

module.exports = class Company {
    constructor(name, address, phoneNumber){
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
};

