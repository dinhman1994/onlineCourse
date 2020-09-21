var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app =require('../app');

var tokenMiddleware = require('../middleware/tokenMiddleware');

router.post('/',(req,res)=>{

    if(req.body.username==="anonystick"){

        if(req.body.password===123){
             //if eveything is okey let's create our token 

        const payload = {

            check:  true

          };

          var token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 1440 // expires in 24 hours

          });


          res.json({
            message: 'authentication done ',
            token: token
          });

        }else{
            res.json({message:"please check your password !"})
        }

    }else{

        res.json({message:"user not found !"})

    }

});

router.get('/api',tokenMiddleware.checkToken,(req,res)=>{
 let products = [
     {
         id: 1,
         name:"cheese"
     },
     {
        id: 2,
        name:"carottes"
    }
 ]

 res.json(products)

});

module.exports = router;