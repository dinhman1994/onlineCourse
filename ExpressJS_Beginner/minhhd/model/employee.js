var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 100 },
    age: { type: Number, min: 18, max: 60 },
    company: { type: String }
});

module.exports = class Employee {
    constructor(first_name, last_name, age, company) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.company = company;
    }
};

module.exports.EmployeeModel = mongoose.model('Employee', EmployeeSchema);

