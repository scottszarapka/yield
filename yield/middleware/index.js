var middleware    = require('./middleware');
var express       = require('express');
var _             = require('underscore');
var url           = require('url');
var when          = require('when');
var errors        = require('../errors/handler');
var path          = require('path');
var config        = require('../config');
var packageInfo   = require('../../package.json');
var passport      = require('passport');
var less          = require('less-middleware');

var expressServer;

function yieldLocals (req, res, next) {
  res.locals = res.locals || {};
  res.locals.version = packageInfo.version;

  // Expose Admin Locals only if the Current user is an Administrator
  if(req.user && req.user.admin === true) {
    // Add in some admin locals
  } else {
    next();
  }
}

module.exports = function (server) {
  var oneHour     = 60 * 60 * 1000;
  var oneYear     = 365 * 24 * oneHour;
  var root        = config.paths().webroot;
  var corePath    = config.paths().corePath;
  var appRoot     = config.paths().appRoot;
  var cookie;

  expressServer = server;

  // TODO: Cache Server Middleware

  // Logging & LESS
  if (expressServer.get('env') !== 'development') {
    expressServer.use(express.logger());
  } else {
     expressServer.use(express.logger('dev'));
     expressServer.use(less({
      dest: '/css',
      src: '../src/less',
      root: config.paths().contentPath,
      compress: true,
      debug: true
    }));
  }

  expressServer.set('views', corePath + '/views');
  expressServer.set('view engine', 'jade');

  // TODO: Check SSL

  expressServer.use(express.static(path.join(appRoot, 'public')));

  expressServer.use(express.cookieParser());
  expressServer.use(express.session({ secret: 'temporary' }));
  expressServer.use(passport.initialize());
  expressServer.use(passport.session());
  expressServer.use(yieldLocals);

  expressServer.use(express.json());
  expressServer.use(express.urlencoded());

  expressServer.use(root, expressServer.router);
};

module.exports.middleware = middleware;