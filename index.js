/*
 * github-linker-core
 * https://github.com/stefanbuck/github-linker
 *
 * Copyright (c) 2014 Stefan Buck
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var manifest = require('./lib/manifest');
var reqr = require('./lib/require');

var getType = function(url) {

  var urlContains = function(indicator) {
    return url.indexOf(indicator) === url.length - indicator.length;
  };
  var lookup = {
    '/package.json': 'npm',
    '/bower.json': 'bower',
    '.js': 'js',
    '.coffee': 'coffee'
  };

  return _.find(lookup, function(type, urlFragment) {
    return urlContains(urlFragment);
  });
};

module.exports = function($, url, cb) {

  var type = getType(url);

  if (type === 'npm' || type === 'bower') {
    manifest($, type, cb);
  } else if (type === 'js' || type === 'coffee') {
    reqr($, type, url, cb);
  }
};