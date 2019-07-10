var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ag = require('agensgraph');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var engine = require('ejs-locals');
var expressLayouts = require('express-ejs-layouts');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// ejs-layouts setting
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.use(expressLayouts);


// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var config = {
  user: 'jhkim',
  password: '',
  database: 'jhkim',
  host: '127.0.0.1',
  port: 5432
};

app.get('/', (req, res) => {
  var list = [];
  var client = new ag.Client(config);
  client.connect();
  client.query('SET graph_path=network');
  client.query("MATCH (a:person)-[r:knows]->(b:person) RETURN a,r,b;", function(err, data){
    if (err) {
      throw err;
    } else {
      list = data.rows;
      // console.log(JSON.stringify(data.rows));
      // console.log(data.rows);
    }
    res.render('index', {
      title: 'agensgraph-node test.',
      description: 'cyper query test 결과 입니다.',
      list: list
    })
    client.end();
  });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
