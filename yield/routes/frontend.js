var frontend      = require('../controllers/frontend');
var images        = require('../controllers/images');
var middleware    = require('../middleware').middleware;

module.exports = function (server) {
  server.get('/', frontend.home);
  server.get('/p/:page', frontend.pages);
  server.post('/upload', middleware.busboy, images.upload);
};