var frontend = require('../controllers/frontend');

module.exports = function (server) {
  server.get('/', frontend.home);
  server.get('/p/:page', frontend.pages);
};