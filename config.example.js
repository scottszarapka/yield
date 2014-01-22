/**
 *  Yield
 *  Example Configuration
 *
 *  @copyright  Copyright (C) 2014 Scott Szarapka
 *  @author  Scott Szarapka [scott@szarapka.com] (www.szarapka.com)
 *  @license GPL v2 (http://www.gnu.org/licenses/gpl-2.0.txt)
 *  @package  yield
 *
 */

var path = require('path');
var config;

config = {
  development: {
    url: 'http://yoururl.com',
    adminsuffix: 'admin',
    server: {
      host: '127.0.0.1',
      port: '3000'
    },
    database: {
      host: 'mongodb://localhost/yield'
    },
    s3: {
      key: 'yourkey',
      secret: 'yoursecret',
      bucket: 'yourbucket'
    }
  },
  production: {
    url: 'http://yoururl.com',
    adminsuffix: 'admin',
    server: {
      host: '127.0.0.1',
      port: '3000'
    },
    database: {
      host: ''
    },
    s3: {
      key: '',
      secret: '',
      bucket: ''
    }
  }
};

module.exports = config;