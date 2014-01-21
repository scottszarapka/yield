var config      = require('../config');
var _           = require('underscore');
var errors      = require('../errors/handler');
var when        = require('when');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');

var imageControllers;

imageControllers = {
  upload: function (req, res) {
    var type  = req.files.image.type;
    var ext   = path.extname(req.files.image.name).toLowerCase();

    if((type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/gif' && type !== 'image/svg+xml') || (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.png' && ext !== '.svg' && ext !== '.svgz')) {
      return res.send(415, 'Unsupported media type.');
    }

    res.json(200, req.files.image);
  }
};

module.exports = imageControllers;