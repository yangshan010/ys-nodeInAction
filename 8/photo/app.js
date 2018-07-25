var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var photos = require('./routes/photos')


var app = express();
console.log(process.env.NODE_ENV)
// view engine setup
app.set('views', path.join(__dirname, 'views')); // 指定express在查找视图时所用的目录 
app.set('view engine', 'ejs'); // 设置默认的模板引擎为ejs
// 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', photos.list);
app.get('/upload',photos.form)
app.post('/upload',phtots.submit(app.get('photos')))
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

app.listen(3000)
// module.exports = app;
