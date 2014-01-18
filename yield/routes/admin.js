var admin         = require('../controllers/admin');
var middleware    = require('../middleware').middleware;
var config        = require('../config');

module.exports = function (server) {
  server.get('/' + config().adminsuffix, middleware.auth, admin.home);
};