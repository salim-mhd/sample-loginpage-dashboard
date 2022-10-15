var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var userRouter = require('./routes/user');
var adminloginRouter = require('./routes/admin');
var adminRouter = require('./routes/adminlogin');

var hbs=require("express-handlebars");
const fileUpload = require('express-fileupload');
var db=require("./config/connection")

var app = express();

var seccion=require("express-session")

//cache-clear
app.use((req,res,next)=>{
  if(!req.login){
    res.header("cache-control","private,no-cache,no-store,must revalidate");
    res.header("Express","-3");
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs' ,hbs.engine ({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
app.use(seccion({secret:"key",cookie:{maxAge:600000}}))

db.connect((err)=>{
  if(err){
    console.log("Connection Error:"+err)
  }else{
  console.log("Database Connected")
  }

})

app.use('/', loginRouter);
app.use('/signup', signupRouter);
app.use('/user', userRouter);
app.use('/adminlogin', adminloginRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
