const gulp = require('gulp');
const del = require('del');
const paths = require('./paths.js');

var cleanBuildDir = function(){
	return del(paths.buildDir);
};

var cleanBuildJsDir = function(){
    return del(paths.buildDir + '/scripts/');
};

var cleanBuildCssDir = function(){
    return del(paths.buildDir + '/styles/');
};

module.exports = {
    'clean': cleanBuildDir,
    'cleanJs': cleanBuildJsDir,
    'cleanCss': cleanBuildCssDir
};