const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const paths = require('./paths.js');

var copyImages = function () {
   return gulp.src('./images/**')
       .pipe(imagemin([
           imagemin.gifsicle({
               interlaced: true
           }), imagemin.jpegtran({
               progressive: true
           }), imagemin.optipng({
               optimizationLevel: 5
           })
       ]))
       .pipe(gulp.dest(paths.buildDir + '/images'));
};

var copyHtml = function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(paths.buildDir));
};

module.exports = {
	'copyImages': copyImages,
    'copyHtml': copyHtml
};

