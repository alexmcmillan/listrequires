#!/usr/bin/env node
var path = require('path');
var listrequires = require('../lib/listrequires');

var filename = path.join(process.cwd(), process.argv[2]);

listrequires(filename);