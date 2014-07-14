var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('./models/user.js');
var fbauth = require('./authentication.js');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

mongoose.connect('mongodb://dpac:dpac@novus.modulusmongo.net:27017/uhivyG9y');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(methodOverride());
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// view engine setup

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', routes);
app.use('/auth', users);

app.get('*', function(req, res){
    res.sendfile('./public/index.html');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
