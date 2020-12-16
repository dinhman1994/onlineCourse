const fs = require('fs');
const { body, validationResult } = require('express-validator');

const courseService = require('../services/courseService');
const categoryService = require('../services/categoryService');

var changeNameFile = (oldPath,newPath) => new Promise(function(resolve,reject){
  fs.rename(oldPath, newPath, (err) => {
    if(err)
    reject(oldPath);
    resolve(newPath);
  }); 
});

exports.postCreateNewCourse = [
  body('name','Name is required field').not().isEmpty().isLength({ min: 2, max: 15 }),
  body('timeOfCourse','Time Of Course is required field').not().isEmpty(),
  body('timeOfCourse','Time Of Course must be number from 1 to 10 ').custom(value => {
    return (+value && +value>=1 && +value<10);
  }),
  body('createDay','Create Day is required').not().isEmpty(),
  body('statusCourse','Status Course is required').not().isEmpty(),
  body('typeOfCourse','Type Of Course is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
    return res.render('createCourse', { user:req.session.user, errs: errors.errors, categories:req.session.categories, oldInfor:req.body});
    }
    if (req.body.categoryName === undefined){
    const error = new Error('You must have choose category for the Course');
    return res.render('createCourse', { user:req.session.user, error:error, categories:req.session.categories, oldInfor:req.body });
    }
    if (req.body.typeOfCourse === 'limited')
    {
    if(req.body.secretKey === '')
    {
      const error = new Error('You must have SecretKey in limited Course');
      return res.render('createCourse', { user:req.session.user, error:error, categories:req.session.categories, oldInfor:req.body});
    }
    }
  
    return next();
  }
];
  
exports.postCreateCategory = [
  body('categoryName','Name of Category is required').not().isEmpty(),
  body('categoryName','Name of Category is invalid').isLength({ min: 2, max: 40 }),
  async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
    const categories = await categoryService.getCatagories();
    return res.render('createCategory', { user:req.session.user, errs: errors.errors, categories: categories});
    }
    return next();
  }
];

exports.postCreateTask = [
  body('question','Question is required').not().isEmpty(),
  body('question','Question is invalid').isLength({ min: 5, max: 1000 }),
  async (req,res,next) => {
    const editCourse = await courseService.getEditCourse(req.params);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
    return res.render('editCourse', { user:req.session.user, errs: errors.errors, course:editCourse});
    }
    return next(); 
  }
];

exports.postUploadDocument =  async (req,res,next) => {
  if(req.file === undefined || req.file.mimetype.split('/')[1]!='pdf')
  {
  const error = new Error('Document file is required or invalid');
  const editCourse = await courseService.getEditCourse(req.params);
  return res.render('editCourse', { user:req.session.user, error: error, course:editCourse });
  }
  const oldPath = req.file.path;
  const newPath = './public/documents/'+ req.file.originalname;
  const namefile = await changeNameFile(oldPath,newPath);
  req.file.path = namefile;
  return next();
}
  