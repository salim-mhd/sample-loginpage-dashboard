var express = require('express');
var router = express.Router();
var loginHelper=require("../helpers/logsig-helpers");


 



/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.login){
        res.redirect("/")
    }else if(req.session.alredy){
        res.render("user/signup",{"alredy":req.session.alredy})
        req.session.alredy=false
    }else{
        res.render("user/signup")
    }
          
});

// router.post('/',function(req,res,next){ 
//     loginHelper.doSignup(req.body).then((response)=>{
//         console.log(response);
//         res.redirect("/login")
//     })  
// });

// router.post('/', function(req, res, next) {
//     userHelpers.addUser(req.body,(result)=>{
//       res.redirect("/admin")
//     })
    
//   }); 





module.exports = router;
