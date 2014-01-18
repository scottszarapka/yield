/**
 *  Yield
 *  Configuration Loader
 *
 *  Standard entry point for all configuration data. This file wraps
 *  the root level config.js file, anything that needs to reference
 *  config.js should be using this file.
 *
 *  @copyright  Copyright (C) 2014 Scott Szarapka
 *  @author  Scott Szarapka [scott@szarapka.com] (www.szarapka.com)
 *  @license GPL v2 (http://www.gnu.org/licenses/gpl-2.0.txt)
 *  @package  yield
 *
 */

var loader = require('./loader');
var paths = require('./paths');
var guideConfig;

function config() {
  return guideConfig || require('../../config')[process.env.NODE_ENV];
}

function loadConfig() {
  return loader().then(function (config) {
    guideConfig = config;
  });
}

config.load = loadConfig;
config.paths = paths;

module.exports = config;