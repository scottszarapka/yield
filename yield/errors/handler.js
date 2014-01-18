/**
 *  Yield.js
 *  Error Handling
 *
 *  @copyright  Copyright (C) 2013 Scott Szarapka
 *  @author  Scott Szarapka [scott@szarapka.com] (www.szarapka.com)
 *  @license GPL v2 (http://www.gnu.org/licenses/gpl-2.0.txt)
 *  @package  yield
 *
 */

// depdendencies
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var colors = require('colors');
var errors;

// paths
var dirRoot = path.resolve(__dirname, '../../');

// error handling helpers
errors = {
  throwError: function (err) {
    if (!err) {
      err = new Error('An Error Occured.');
    }
    if (_.isString(err)) {
      throw new Error(err);
    }
    throw err;
  },
  logWarn: function (warn, context, help) {
    console.log('\nWarning:'.yellow, warn.yellow);
    if (context) {
      console.log(context.white);
    }
    if (help) {
      console.log(help.green);
    }
    console.log('');
  },
  logError: function (err, context, help) {
    var stack = err ? err.stack : null;
    err = err.message || err || 'Unknown';
    console.log('\nERROR:'.red, err.red);
    if (context) {
      console.log(context.white);
    }
    if (help) {
      console.log(help.green);
    }
    console.log('');
    if (stack) {
      console.error(stack, '\n');
    }
  },
  logErrorAndExit: function (err, context, help) {
    this.logError(err, context, help);
    process.exit(0);
  },
  logAndThrowError: function (err, context, help) {
    this.logError(err, context, help);
    this.throwError(err);
  }
};

_.bindAll(
  errors,
  'throwError',
  'logWarn',
  'logError',
  'logErrorAndExit',
  'logAndThrowError'
);

module.exports = errors;