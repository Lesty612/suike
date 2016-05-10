var express = require('express'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	routes = require('./routes/main'),
	user = require('./routes/user'),
	path = require('path');

/**
 * [Nodejs + express实现随堂应用后端]
 * @author Lesty<lesty612@163.com>
 * @codeDate 2016.5.9
 */
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use('/', routes);
app.use('/user', user);


app.listen(8777, function() {
	console.log('Listening in port 8777');
});