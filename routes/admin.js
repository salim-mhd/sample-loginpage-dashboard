var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();




/* GET users listing. */


router.get('/', function(req, res, next) {
  if(req.session.addmin){
    userHelpers.getAllUser().then((user)=>{
      console.log(user)
          res.render("admin/view-users",{admin:true,user})
    })
  }else{
    res.redirect("/admin")
  }
  
});



router.post('/',(req, res)=>{
  
  if(req.session.addmin){
    // req.session.add=false
    userHelpers.addUser(req.body).then((response)=>{
      if(response.alredy){
        req.session.alredy=true
        res.redirect("/adminlogin/add-user")
      }else{
        res.redirect("/admin")
      } 
    })
  }else{
    res.redirect("/adminlogin")
  }
  
  
})

router.get("/logout",(req,res)=>{
  req.session.login=false
  req.session.destroy(function(err){
      if(err){
          console.log(err)
          res.send("Error")
      }else{
          res.redirect("/")
      }
  })
})

router.get("/add-user",function(req,res,next){
  req.session.add=true
  if(req.session.addmin){
    if(req.session.add){
      if(req.session.alredy){
        res.render("admin/add-user",{"alredy":req.session.alredy})
      }else{
        res.render("admin/add-user")
      }  
      }
  }else{
    res.redirect("/admin")
  }
  
})




module.exports = router;
