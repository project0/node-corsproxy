#!/usr/bin/env node
var app = require('express')();
var request = require('request');
var morgan = require('morgan');

if (!process.env.URL) {
  throw 'Please set environment URL for proxy';
}
var remoteUrl = process.env.URL;
var port = process.env.PORT || 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// enfore OPTIONS to be return 200
app.use('*', function(req, res, next) {
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.all('*', function(req, res, next) {
  var remoteReq = request(remoteUrl + req.url);
  req.pipe(remoteReq);
  remoteReq.pipe(res);
});

app.listen(port, console.log);
