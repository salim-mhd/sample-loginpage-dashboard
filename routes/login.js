var express = require('express');
const { response } = require('../app');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
var userHelper=require("../helpers/user-helpers")



/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.login){
        res.redirect("/user")
    }else if(req.session.errpass){
        res.render("user/login",{"errpass":req.session.errpass})
        req.session.errpass=false
    }else if(req.session.erremail){
        res.render("user/login",{"erremail":req.session.erremail})
        req.session.erremail=false
    }else{
        res.render("user/login")
    }
      
});

router.post('/',function(req,res,next){
    userHelper.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.uservalid=response.uservalid
            req.session.login=true
            res.redirect("/") 
        }else if(response.invalidpass){
            req.session.errpass=true
            res.redirect("/")
        }else if(response.invalidemail){
            req.session.erremail=true
            res.redirect("/")
        }else{
            res.redirect("/")
        }
    })
})

router.get('/delete', function(req, res, next) {

    req.session.destroy(function(err){
      if(err){
          console.log(err)
          res.send("Error")
      }else{
          // res.render("base",{title:"Login System",logout:"Logout Successfulli...!!!"})
          res.redirect("/admin/session")
      }
  })
    
  });


router.post('/sig',(req, res)=>{
        userHelper.addUser(req.body).then((response)=>{
            if(response.alredy){
                req.session.alredy=true
                res.redirect("/signup")
            }else{
                res.redirect("/")
            }
        }) 
})




module.exports = router;
