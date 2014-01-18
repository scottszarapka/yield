var config      = require('../config');
var _           = require('underscore');
var errors      = require('../errors/handler');
var when        = require('when');
var url         = require('url');
var fs          = require('fs');

var frontendControllers;

frontendControllers = {
  home: function (req, res, next) {
    return res.render('home', {});
  },
  // Page Router, will load pages up based on slug provided, will
  // 404 if the template file isn't found.
  pages: function (req, res, next) {
    return res.render('pages/'+req.params.page, {}, function (err, html) {
      if(err) {
        res.send(404, 'Page Not Found.');
      } else {
        res.send(html);
      }
    });
  },
  dashboard: function (req, res, next) {

  },
  profile: function (req, res, next) {

  }
};

module.exports = frontendControllers;