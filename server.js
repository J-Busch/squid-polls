'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI);
    
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
    secret: 'pollSesh',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT;    
app.listen(port || 8080, function () {
    console.log('Listening on port' + port);
});