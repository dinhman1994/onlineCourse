const multer = require('multer');

exports.loadDocument = (req,res,next) => {
    var upload = multer({ dest: './public/documents/' }).single('path');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err);
          next();
        } else if (err) {
          console.log(err);
          next();
        }
        next();
      });
}