var config        = require('./config');
var express       = require('express');
var when          = require('when');
var _             = require('underscore');
var fs            = require('fs');
var errors        = require('./errors/handler');
var path          = require('path');
var routes        = require('./routes');
var middleware    = require('./middleware');
var db            = require('./db');
var Reaper        = require('tmp-reaper');

// variables
var setup;
var init;

// if we're in dev mode we'd like to load 'when/monitor/console'
// so we can peer into promises that are problematic.
if (process.env.NODE_ENV === 'development') {
    require('when/monitor/console');
}

function setup(server) {
  when.join(
    // Connect to the DB
    db(config().database.host),
    // Configure Paths
    config.paths.update(config().url)
  ).then(function () {
    // Middleware
    middleware(server);

    // Routes
    routes.frontend(server);
    routes.admin(server);

    function startYield() {
      var tmpDir = config.paths().tmp;

      // We can't trust server admins to setup proper temp cleansing
      // on their own, so we create our own tmp folder and use
      // tmp-reaper to clean it out on our own.
      fs.exists(tmpDir, function(exists) {
        if(!exists) {
          fs.mkdir(tmpDir, 0775, function (err) {
            if(err) {
              return errors.logErrorAndExit(er);
            }
          });
        }
      });

      // Start tmp-reaper
      var reaper = new Reaper({
        threshold: '1 hour',
        every: '10 min'
      });
      reaper.watch(tmpDir).start();

      if (process.env.NODE_ENV === 'production') {
        console.log(
          '\nYield is Running...'.green.bold,
          '\nCtrl+C to shut down'.grey
        );

        process.on('SIGINT', function () {
          console.log(
            '\nYield has shut down'.red
          );
          process.exit(0);
        });
      } else {
        console.log(
          ('\nYield is running in ' + process.env.NODE_ENV + '...').green.bold,
          '\nListening on',
          config().server.host + ':' + config().server.port,
          '\nUrl configured as:',
          config().url,
          '\nCtrl+C to shut down'.grey
        );

        process.on('SIGINT', function () {
          console.log(
            '\nYield has shutdown'.red,
            '\nYield was running for',
            Math.round(process.uptime()),
            'seconds'
          );
          process.exit(0);
        });
      }
    }

    server.listen(
      config().server.port,
      config().server.host,
      startYield
    );
  }, function (err) {
    errors.logErrorAndExit(err);
  });
}

// initializes the application
function init(app) {
  if(!app) {
    app = express();
  }

  setup(app);
}

module.exports = init;