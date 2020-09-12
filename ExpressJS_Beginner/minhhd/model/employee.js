var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    first_name: {type: String, required: true, maxlength: 100},
    last_name: {type: String, required: true, maxlength: 100},
    age: {type: Number, min: 18, max: 60},
    company: {type: String}
});

module.exports.Employee = class Employee {
    constructor(employee) {
        this.first_name = employee.first_name;
        this.last_name = employee.last_name;
        this.age = employee.age;
        this.company = employee.company;
    }
};

module.exports.EmployeeModel = mongoose.model('Employee', EmployeeSchema);

