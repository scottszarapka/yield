var _             = require('underscore');
var config        = require('../config');
var path          = require('path');
var errors        = require('../errors/handler');
var fs            = require('fs');
var Knox          = require('knox');
var when          = require('when');

var s3 = {
  put: function (file) {
    var client = Knox.createClient({
      key: config().s3.key,
      secret: config().s3.secret,
      bucket: config().s3.bucket
    });

    var stream = fs.createReadStream(file.path);
    var headers = {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read',
      'Content-Length': file.size
    };

    var upload = when.defer();

    client.putStream(stream, file.storageName, headers, function (err, res) {
      if (err) {
        console.log(err);
        upload.reject(err);
      }
      console.log(res.statusCode);
      console.log(res.headers);
      upload.resolve(res.statusCode);
    });

    return upload.promise;
  }
};

module.exports = s3;