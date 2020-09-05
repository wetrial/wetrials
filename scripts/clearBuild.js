/* eslint-disable global-require */
const { join } = require('path');
const del = require('del');
const getPackages = require('./utils/getPackages');

const packageDists = getPackages().map((name) => {
  return join(__dirname, '../packages', name, './{es,lib,dist}');
});

del.sync(packageDists);
