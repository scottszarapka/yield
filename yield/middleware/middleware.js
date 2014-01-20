var _             = require('underscore');
var BusBoy        = require('busboy');
var express       = require('express');
var passport      = require('passport');
var config        = require('../config');
var path          = require('path');
var knox          = require('knox');
var os            = require('os');
var crypto        = require('crypto');
var errors        = require('../errors/handler');

var expressServer;

var middleware = {
  auth: function (req, res, next) {
    if(!req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  },
  busboy: function (req, res, next) {
    var busboy,
        stream,
        tmpDir,
        hasError = false;

    // We only want to invoke for POST requests
    if (req.method && !req.method.match(/post/i)) return next();


    busboy = new BusBoy({ headers: req.headers });

    // TODO: Need to better understand the default clean up protocols
    // for OS tmp dirs to ensure we don't fill up hosts in minutes.
    tmpDir = os.tmpdir();

    req.files = req.files || {};
    req.body = req.body || {};

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      var filePath,
          tmpFileName,
          md5 = crypto.createHash('md5');

      if (!filename) hasError = true;
      if (hasError) return file.emit('end');

      md5.update(filename, 'utf8');

      tmpFileName = (new Date()).getTime() + md5.digest('hex');
      filePath = path.join(tmpDir, tmpFileName || 'temp.tmp');

      file.on('end', function () {
        req.files[fieldname] = {
          type: mimetype,
          encoding: encoding,
          name: filename,
          path: filepath
        };
      });

      busboy.on('limit', function () {
        hasError = true;
        res.send(413, {error: 413, message: 'File size is too big for the file hole.'});
      });

      busyboy.on('error', function (err) {
        errors.logError(err, 'BusBoy');
      });

      stream = fs.createWriteStream(filePath);

      stream.on('error', function (err) {
        errors.logError(err, 'BusBoy: Stream');
      });

      file.pipe(stream);

    });

    busboy.on('field', function(fieldname, val) {
      req.body[fieldname] = val;
    });

    busboy.on('end', function () {
      next();
    });

    req.pipe(busboy);

  }
};

module.exports = middleware;