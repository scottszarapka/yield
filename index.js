/**
 *  Yield
 *  Boot Loader
 *
 *  @copyright  Copyright (C) 2014 Scott Szarapka
 *  @author  Scott Szarapka [scott@szarapka.com] (www.szarapka.com)
 *  @license GPL v2 (http://www.gnu.org/licenses/gpl-2.0.txt)
 *  @package  yield
 *
 */

var enviro = require('./enviro');
var config = require('./yield/config');
var errors = require('./yield/errors/handler');

// TEMP: Check the Enviro Config to see if we're in production
if(enviro.production) {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

config.load().then(function () {
  var yield = require('./yield');
  yield();
}).otherwise(errors.logAndThrowError);