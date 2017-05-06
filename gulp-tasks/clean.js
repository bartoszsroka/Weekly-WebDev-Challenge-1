const gulp = require('gulp');
const del = require('del');
const paths = require('./paths.js');

var cleanBuildDir = function () {
    return del(paths.buildDir);
};

var cleanTempFiles = function () {
    var buildDir = paths.buildDir + '/';
    var stylesDir = buildDir + 'styles/';
    var scriptsDir = buildDir + 'scripts/';
    var favicon = buildDir + 'images/favicon-encoded.txt';
    return del([stylesDir, scriptsDir, favicon]);
};

module.exports = {
    'clean': cleanBuildDir,
    'cleanTempFiles': cleanTempFiles
};