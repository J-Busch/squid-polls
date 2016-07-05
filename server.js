'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose');

var url = "mongodb://localhost:27017";
var port = process.env.PORT;
var app = express();

mongoose.connect(url);
    
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);
    
app.listen(port, function () {
    console.log('Listening on port' + port);
});