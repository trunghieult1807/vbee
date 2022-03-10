var express = require('express');
var _ = require('lodash');
var fs = require('fs');
var AWS = require('aws-sdk');
const { toArray } = require('lodash');
const { mainModule } = require('process');
const app = require('../app');
var router = express.Router();
var path = require('path');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-southeast-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

// call S3 to retrieve upload file to specified bucket
// var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
// var file = process.argv[3];
var uploadParams = {Bucket: 'vbee-audio-bucket', Key: '', Body: ''};
var file = 'origin.wav';


// Configure the file stream and obtain the upload parameters
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});


router.post('/', function(req, res, next) {
    const url = _.get(req, "body.link", "");
    const text = _.get(req, "body.request.input_text", "");
    const id = _.get(req, "body.request.request_id", "");
    res.send(`${url}, ${text}, ${id}`);
});

module.exports = router;
  