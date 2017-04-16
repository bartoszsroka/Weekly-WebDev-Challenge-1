const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const paths = require('./paths.js');

var buildCss = function () {
    return gulp.src(['styles/reset.css', 'styles/main.css', 'styles/!(reset|main)*.css'])
        .pipe(concat('styles.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.buildDir + '/styles'));
};

var buildJs = function () {
    return gulp.src('scripts/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.buildDir + '/scripts'));
};

module.exports = {
	'buildCss': buildCss,
	'buildJs': buildJs
}