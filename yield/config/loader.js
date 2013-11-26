/**
 *  Yield
 *  Configuration Loader
 *
 *  @copyright  Copyright (C) 2013 Scott Szarapka
 *  @author  Scott Szarapka [scott@szarapka.com] (www.szarapka.com)
 *  @license GPL v2 (http://www.gnu.org/licenses/gpl-2.0.txt)
 *  @package  yield
 *  @version  0.0.1
 *
 */

// dependecies
var fs = require('fs');
var url = require('url');
var when = require('when');
var path = require('path');
var errors = require('../errors/handler');

// paths
var dirRoot = path.resolve(__dirname, '../../');
var example = path.join(dirRoot, 'config.example.js');
var config = path.join(dirRoot, 'config.js');

function validateConfig() {
  var environment = process.env.NODE_ENV || 'undefined';
  try {
    config = require('../../config')[environment];
  } catch (ignore) {

  }

  if (!config) {
    errors.logError(new Error('No configuration file for the current NODE_ENV found.'), 'NODE_ENV=' + environment, 'Your config.js requires a section for the current NODE_ENV.');
    return when.reject();
  }

  return when.resolve();
}

function loadConfig() {
  var loaded = when.defer();
  fs.exists(config, function checkConfig(configExists) {
    if (configExists) {
      validateConfig().then(loaded.resolve).otherwise(loaded.reject);
    } else {
      errors.logError(new Error('No configuration file found.'), 'config.js', 'Use config.example.js to create a config.js file in the root directory.');
      return when.reject();
    }
  });
  return loaded.promise;
}

module.exports = loadConfig;