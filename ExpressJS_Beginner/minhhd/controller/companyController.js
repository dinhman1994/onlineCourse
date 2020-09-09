const Company = require('../model/company');
const companyModel = Company.CompanyModel;

exports.addCompany = (req, res, next) => {
    var name = req.body.name;
    var address = req.body.address;
    var phoneNumber = req.body.phoneNumber;
    var company = new  Company(name, address, phoneNumber);
    companyModel.create(company, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Added company ${name}`);
        }
    })
};