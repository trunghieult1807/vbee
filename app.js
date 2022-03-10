var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var pingRouter = require('./routes/ping');
var ttsRouter = require('./routes/tts');
var vbeeCallbackRouter = require('./routes/vbee_callback');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/ping', pingRouter);
app.use('/tts', ttsRouter);
app.use('/vbee_callback', vbeeCallbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
