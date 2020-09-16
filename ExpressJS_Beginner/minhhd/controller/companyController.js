const Company = require('../model/company');
const companyModel = Company.CompanyModel;

exports.addCompany = (req, res, next) => {
    let name = req.body.name;
    let address = req.body.address;
    let phoneNumber = req.body.phoneNumber;
    let company = new Company(name, address, phoneNumber);
    companyModel.create(company, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Added company ${name}`);
        }
    })
};