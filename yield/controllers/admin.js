var config      = require('../config');
var _           = require('underscore');
var errors      = require('../errors/handler');
var when        = require('when');
var url         = require('url');
var fs          = require('fs');

var adminControllers;

adminControllers = {
  home: function (req, res, next) {
    return res.json(200, 'I am authorized.');
  }
};

module.exports = adminControllers;