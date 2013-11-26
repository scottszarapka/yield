/**
 *  Yield
 *  Boot Loader
 *
 *  @copyright  Copyright (C) 2013 Scott Szarapka
 *  @author  Scott Szarapka [scott@szarapka.com] (www.szarapka.com)
 *  @license GPL v2 (http://www.gnu.org/licenses/gpl-2.0.txt)
 *  @package  yield
 *  @version  0.0.1
 *
 */

var loader = require('./yield/config/loader');
var errors = require('./yield/errors/handler');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

loader().then(function () {
  console.log('Config is Good');
}).otherwise(errors.logAndThrowError);