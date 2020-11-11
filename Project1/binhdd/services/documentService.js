const moment = require('moment');

const db = require('../models/index');

const documents = db['Documents'];

exports.createDocument = async function(data,courseData){
  const type = 'pdf';
  const path = '/' + data.file.path.split('/').slice(2).join('/');
  try{
    const newDocument = await documents.create({
      path: path,
      type: type,
      courseId: courseData.courseId,
      createdAt: moment(),
      updatedAt: moment()
    });
	  return newDocument;
  }
  catch(err){
    console.log(err);
    return null;
  }
  return null;
}

exports.findDocument = async function(data){
  try{
    const documentData = await documents.findOne({
      where:{
        documentId: data.documentId
      }
    });
    return documentData.dataValues;
  } catch(err){
    console.log(err);
    return null;
  }
  return null;
  
}