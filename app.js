//package.js があるディレクトリでnpm startで起動
//http://localhost:3000が基本

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/soft1/index');
var memoRouter = require('./routes/soft1/memo');
var questionRouter = require('./routes/soft1/question');
var calenderRouter = require('./routes/soft1/calender');
var resultRouter = require('./routes/soft1/result');
var detailRouter = require('./routes/soft1/detail');
var scoreRouter = require('./routes/soft1/score');
var rankRouter = require('./routes/soft1/ranking');
//var addRouter = require('./routes/add');

var indexRouter2 = require('./routes/soft2/index');
var memoRouter2 = require('./routes/soft2/memo');
var questionRouter2 = require('./routes/soft2/question');
var calenderRouter2 = require('./routes/soft2/calender');
var resultRouter2 = require('./routes/soft2/result');
var detailRouter2 = require('./routes/soft2/detail');
var scoreRouter2 = require('./routes/soft2/score');
var rankRouter2 = require('./routes/soft2/ranking');

var indexRouterex = require('./routes/softex/index');
var memoRouterex = require('./routes/softex/memo');
var questionRouterex = require('./routes/softex/question');
var calenderRouterex = require('./routes/softex/calender');
var resultRouterex = require('./routes/softex/result');
var detailRouterex = require('./routes/softex/detail');
var scoreRouterex = require('./routes/softex/score');
var rankRouterex = require('./routes/softex/ranking');
var badgeRouterex = require('./routes/softex/badge');

var indexRouterexB = require('./routes/softexB/index');
var memoRouterexB = require('./routes/softexB/memo');
var questionRouterexB = require('./routes/softexB/question');
var calenderRouterexB = require('./routes/softexB/calender');
var resultRouterexB = require('./routes/softexB/result');
var detailRouterexB = require('./routes/softexB/detail');
var scoreRouterexB = require('./routes/softexB/score');
var rankRouterexB = require('./routes/softexB/ranking');
var badgeRouterexB = require('./routes/softexB/badge');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/soft1/index', indexRouter);
app.use('/soft1/memo', memoRouter);
app.use('/soft1/quest', questionRouter);
app.use('/soft1/calender', calenderRouter);
app.use('/soft1/result', resultRouter);
app.use('/soft1/detail', detailRouter);
app.use('/soft1/score', scoreRouter);
app.use('/soft1/rank', rankRouter);
// app.use('/add',addRouter);

app.use('/soft2/index', indexRouter2);
app.use('/soft2/memo', memoRouter2);
app.use('/soft2/quest', questionRouter2);
app.use('/soft2/calender', calenderRouter2);
app.use('/soft2/result', resultRouter2);
app.use('/soft2/detail', detailRouter2);
app.use('/soft2/score', scoreRouter2);
app.use('/soft2/rank', rankRouter2);

app.use('/softex/index', indexRouterex);
app.use('/softex/memo', memoRouterex);
app.use('/softex/quest', questionRouterex);
app.use('/softex/calender', calenderRouterex);
app.use('/softex/result', resultRouterex);
app.use('/softex/detail', detailRouterex);
app.use('/softex/score', scoreRouterex);
app.use('/softex/rank', rankRouterex);
app.use('/softex/badge', badgeRouterex);

app.use('/softexB/index', indexRouterexB);
app.use('/softexB/memo', memoRouterexB);
app.use('/softexB/quest', questionRouterexB);
app.use('/softexB/calender', calenderRouterexB);
app.use('/softexB/result', resultRouterexB);
app.use('/softexB/detail', detailRouterexB);
app.use('/softexB/score', scoreRouterexB);
app.use('/softexB/rank', rankRouterexB);
app.use('/softexB/badge', badgeRouterexB);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

