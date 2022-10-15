const { query } = require('express');
var express = require('express');
const { response } = require('../app');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();



var adminname="admin@gmil.com"
var adminpassword="1234"

/* GET users listing. */
router.get('/', function(req, res, next){
    if(req.session.addmin){
        res.redirect("/adminlogin")
    }else if(req.session.addminerr){
        res.render("admin/adminlogin",{"addminerr":req.session.addminerr})
    }else if(req.session.alredy){
        res.render("admin/adminlogin",{"alredy":req.session.alredy})
    }else{
        res.render("admin/adminlogin")
    }
    
})

router.post('/', function(req, res, next){
    if(adminname===req.body.email && adminpassword===req.body.Password){
        req.session.addmin=true
        res.redirect("/adminlogin")
    }else{
        req.session.addminerr=true
        res.redirect("/admin")
    }
})


router.get("/adminlogout",(req,res)=>{
    req.session.login=false
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("Error")
        }else{
            // res.render("base",{title:"Login System",logout:"Logout Successfulli...!!!"})
            res.redirect("/admin")
        }
    })
})

router.get("/delete/:id",(req,res)=>{
    let userId=req.params.id
    userHelpers.deleteUser(userId).then((response)=>{
        res.redirect("/delete")
    })
})


router.get("/session",(req,res)=>{
    req.session.addmin=true
    res.redirect("/admin")
})

router.get("/edit/:id",async (req,res)=>{
    if(req.session.addmin){
        // let id=req.params.id
        // console.log(id)
        req.session.edit=true
        if(req.session.edit){
            let userinfo=await userHelpers.getUserinfo(req.params.id)
            console.log(userinfo);
            res.render("admin/edit-user",{userinfo})
            req.session.edit=false
        }
    
    }else{
        res.redirect("/admin")
    }
    })

router.post("/edituser/:id",(req,res)=>{
    // if(req.session.edit){
        userHelpers.updateuser(req.params.id,req.body).then(()=>{
        // req.session.edit=false
        res.redirect("/admin")
    })
    
    
})

router.get("/back",(req,res)=>{
    req.session.edit=false
    res.redirect("/admin")

})



module.exports = router;