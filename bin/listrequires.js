#!/usr/bin/env node
var listrequires = require('../lib/listrequires');

var filename = './' + process.argv[1];

listrequires(filename);