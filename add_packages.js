#!/usr/bin/env node
/*
 * adds packages and their versions from node_modules to package.json
 */

var fs = require('fs');
var path = require('path');

var pjs = JSON.parse(fs.readFileSync('./package.json'));

var modules = fs.readdirSync('node_modules');

modules.forEach(function(module) {
    if(module[0] === '.')
        return;

    var filename = path.join('node_modules', module, 'package.json');

    var version = JSON.parse(fs.readFileSync(filename)).version;

    console.log(module, version);
    pjs.dependencies[module] = version;
});

fs.writeFileSync('./package.json', JSON.stringify(pjs, null, 2));

console.log('\npackages and versions saved to package.json');
