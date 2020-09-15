require mongoDB = require('./connectDB');

mongoDB.pushtoDB(function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Users: '+users);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
