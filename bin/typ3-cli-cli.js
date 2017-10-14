#!/usr/bin/env node

var maker = require('climaker');
var path = require('path');
var packageInfo = require('../package.json');
var name = 'typ3-cli';

maker(name, packageInfo.version, path.join(__dirname, '../commands/' + name));
