//package.js があるディレクトリでnpm startで起動
//http://localhost:3000が基本

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var memoRouter = require('./routes/memo');
var questionRouter = require('./routes/question');
var calenderRouter = require('./routes/calender');
var resultRouter = require('./routes/result');
var detailRouter = require('./routes/detail');
var addRouter = require('./routes/add');
var levelRouter = require('./routes/level');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
//app.use('/user', userRouter);
app.use('/memo', memoRouter);
app.use('/quest',questionRouter);
app.use('/calender',calenderRouter);
app.use('/result',resultRouter);
app.use('/detail',detailRouter);
// app.use('/add',addRouter);
// app.use('/level',levelRouter);

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

