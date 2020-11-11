const documentService = require('../services/documentService');

exports.downloadFile = async(req,res) => {
    const fileData = await documentService.findDocument(req.params);
    const filepath = 'public'+ fileData.path;
    return res.download(filepath);
    // res.render('index');
};