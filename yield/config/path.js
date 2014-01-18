var path = require('path');
var url = require('url');
var when = require('when');

var appRoot = path.resolve(__dirname, '../../');
var corePath = path.resolve(appRoot, 'yield/');
var contentPath = path.resolve(appRoot, 'public/');
var publicViews = path.resolve(corePath, 'views/');
var adminViews = path.resolve(corePath, 'views/admin/');
var localPath = '';

function paths() {
  return {
    'appRoot': appRoot,
    'path': localPath,
    'webroot': localPath === '/' ? '' : localPath,
    'config': path.join(appRoot, 'config.js'),
    'contentPath': contentPath,
    'corePath': corePath,
    'publicViews': publicViews,
    'adminViews': adminViews
  };
}

function update(configURL) {
  localPath = url.parse(configURL).path;

  if(localPath !== '/') {
    localPath = localPath.replace(/\/$/, '');
  }

  return when.resolve();
}

module.exports = paths;
module.exports.update = update;