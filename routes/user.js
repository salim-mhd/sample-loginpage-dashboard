var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let uservalid=req.session.uservalid
  console.log(uservalid)
  let products=[
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekeR0W5FZJ0Q8C79KagohjgZDbAWCAKkhCt7Hiy3vOqdNJgJ-hqPnjOXm2ifAUijaIsc&usqp=CAU",
      name:"IPHONE 11",
      category:"Mobile",
      description:"The iPhone is a line of smartphones designed and marketed by Apple Inc."

    },
    {
      img:"https://media.tracfone.com/wps/contenthandler/dav/content/libraries/wcm.library.phones/components/GPAPI11C64RDP/wcm.comps.image/st_ecom_large.png",
      name:"IPHONE 12",
      category:"Mobile",
      description:"The iPhone is a line of smartphones designed and marketed by Apple Inc."

    },
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9OU20esubHqAtun8Yf4lQCBl27JdxNCCTfLHJBgXUW_tsi511ZhElAbReuKy-UQTaRHs&usqp=CAU",
      name:"IPHONE 12 pro",
      category:"Mobile",
      description:"The iPhone is a line of smartphones designed and marketed by Apple Inc."

    },
    {
      img:"https://media.tracfone.com/wps/contenthandler/dav/content/libraries/wcm.library.phones/components/IPHONE12PROMAX/wcm.comps.image/PacificBlue.png",
      name:"IPHONE 13",
      category:"Mobile",
      description:"The iPhone is a line of smartphones designed and marketed by Apple Inc."

    }
  ]
 
   if(!uservalid){
    res.redirect("/")
   }else{
    res.render('index', {products,uservalid,user:true});
   }
  //  res.render('index', {products,uservalid,user:true});
    
  
});

module.exports = router;
