var _             = require('underscore');
var express       = require('express');
var passport      = require('passport');
var config        = require('../config');
var path          = require('path');
var expressServer;

var middleware = {
  auth: function (req, res, next) {
    if(!req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  }
};

module.exports = middleware;