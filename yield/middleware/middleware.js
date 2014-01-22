var _             = require('underscore');
var BusBoy        = require('busboy');
var express       = require('express');
var passport      = require('passport');
var config        = require('../config');
var path          = require('path');
var crypto        = require('crypto');
var errors        = require('../errors/handler');
var fs            = require('fs');

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

    tmpDir = config.paths().tmp;

    req.files = req.files || {};
    req.body = req.body || {};

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      var filePath,
          tmpFileName,
          fileId,
          ext,
          md5 = crypto.createHash('md5');

      if (!filename) hasError = true;
      if (hasError) return file.emit('end');

      md5.update(filename, 'utf8');

      tmpFileName = (new Date()).getTime() + md5.digest('hex');
      filePath = path.join(tmpDir, tmpFileName || 'temp.tmp');
      fileId = (+new Date()).toString(36);
      ext = path.extname(filename).toLowerCase();

      file.on('end', function () {
        req.files[fieldname] = {
          type: mimetype,
          encoding: encoding,
          name: filename,
          path: filePath,
          id: fileId,
          ext: ext,
          storageName: (fileId + ext).toLowerCase()
        };
      });

      busboy.on('limit', function () {
        hasError = true;
        res.send(413, {error: 413, message: 'File size is too big for the file hole.'});
      });

      busboy.on('error', function (err) {
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