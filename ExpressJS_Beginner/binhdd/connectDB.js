


console.log('It connected DB');

var userArgs = process.argv.slice(2);

var async = require('async');
var User = require('./models/user');
var Image = require('./models/image');
var History = require('./models/history');
const bcrypt = require('bcrypt');
var moment = require ('moment');


var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://thaiembinh14:25251325ce0@cluster0.yvwbe.gcp.mongodb.net/local_library?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

console.log(mongoDB);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];
var histories = [];
var images = [];


function userCreate(name, age, date_of_birth, userName, password,cb) {
  userdetail = {name:name , age: age , userName: userName, password: password };
  if (date_of_birth != false) userdetail.date_of_birth = date_of_birth;
  
  
  var user = new User(userdetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    };
    console.log('New User: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function userCreateDB() {
    // async.series([
    //     function(callback) {
    //       userCreate('Tung', 25, '1993-03-15', 'Tungbg95', '25251325ce0',callback);
    //     }],
    //     // optional callback
    //     (err, results)=>{
    //       if (err) {
    //           console.log('FINAL ERR: '+err);
    //       }
    //       else {
    //           console.log('Users: '+users);
              
    //       }
    //       // All done, disconnect from database
    //       mongoose.connection.close();
    //     });
    obj = {name: 'Tung', age: 25, date_of_birth: '1993-03-15', userName: 'Tungbg95', password: '25251325ce0' };
    User.create(obj, function (err, small) {
      if (err) return handleError(err);
      // saved!
    });
}

// module.exports = mongoose; 

// async.series([
//     userCreateDB
// ],
// // Optional callback
// function(err, results) {
//     if (err) {
//         console.log('FINAL ERR: '+err);
//     }
//     else {
//         console.log('Users: '+users);
        
//     }
//     // All done, disconnect from database
//     mongoose.connection.close();
// };

//mongodb+srv://thaiembinh14:25251325ce0@cluster0.yvwbe.gcp.mongodb.net/local_library?retryWrites=true&w=majority

// module.exports.pushtoDB = function(cb){
//     async.series([
//         function(callback) {
//           userCreate('Hien', 19, '2000-11-03', 'hienbg03', '25251325ce0',callback);
//         }],
//         // optional callback
//         cb);
// }
// module.exports.pushtoDB = function(cb){
// 	console.log('It connected DB');
// 	var async = require('async');
// 	var User = require('./models/user');
// 	var Image = require('./models/image');
// 	var History = require('./models/history');

// 	var mongoose = require('mongoose');
// 	var mongoDB = "mongodb+srv://thaiembinh14:25251325ce0@cluster0.yvwbe.gcp.mongodb.net/local_library?retryWrites=true&w=majority";

// 	mongoose.connect(mongoDB, { useNewUrlParser: true });
// 	mongoose.Promise = global.Promise;
// 	var db = mongoose.connection;
// 	console.log(mongoDB);
// 	db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// }



function listUsers() {

  User.find({})
    .populate('user').exec(function (err, list_users) {
      if (err) {return next(err)} 
      else {
        for(user of list_users){
          console.log(user);
          var createHash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          console.log(createHash);
        }      
      }
    });

};

function deleteUsers() {
  User.deleteMany({},function(err){
    if(err) {return handleError(err)}
    else{
      console.log("Deleted all");
    }
  });
}

//userCreateDB();
listUsers();
//deleteUsers();

// userCreateDB((err, results)=> {
//     if (err) {
//         console.log('FINAL ERR: '+err);
//     }
//     else {
//         console.log('Users: '+users);
        
//     }
//     // All done, disconnect from database
//     mongoose.connection.close();
// });
 
//deleteUsers();

exports.createUser = [
  body('userName', 'UserName name required at least 2 characters').isLength({ min: 2 }).trim(),
  body('password', 'Password required at least 6 characters').isLength({ min: 6 }).trim(),
  body('name', 'Name required at least 2 characters').isLength({ min: 2 }).trim(),
  (req,res,next) => {
    
  } 
]