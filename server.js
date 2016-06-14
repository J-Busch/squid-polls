'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";
var port = process.env.PORT;
var app = express();

mongo.connect(url, function (err, db) {
    if (err) throw new Error('failed to connect');
    else {
        console.log('MongoDB connected.');
    }
    
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use('/public', express.static(process.cwd() + '/public'));
    
    routes(app, db);
    
    app.listen(port, function () {
        console.log('Listening on port' + port);
    });
});