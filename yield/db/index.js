var mongoose      = require('mongoose');
var when          = require('when');
var error         = require('../errors/handler');

mongoose.connection.on('error',function (err) {
  error.logError(new Error(err), 'Mongoose');
});

mongoose.connection.on('disconnected', function () {
  error.logError(new Error('Mongoose Server Disconnected.'), 'Mongoose');
});

module.exports = function (host) {
  // Let's Get Connected Baby!
  mongoose.connect(host, function (err, res) {
    if(err) {
      error.logError(new Error('Failed to Connect to: ' + host), 'Mongoose', 'Check your mongoose connection configuration.');
      return when.reject();
    }
    return when.resolve();
  });
};