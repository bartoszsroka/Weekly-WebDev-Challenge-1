const gulp = require('gulp');
const inject = require('gulp-inject');
const gutil = require('gulp-util');
const es = require('event-stream');
const paths = require('./paths.js');
const htmlmin = require('gulp-htmlmin');

var _inject = function () {
    var fileToString = function (file) {
        return file.contents.toString('utf8');
    };

    var options = {
        relative: true,
        removeTags: true,
        transform: function (filepath, file, i, length) {
            if (filepath.slice(-3) === '.js') {
                return '<script>' + fileToString(file) + '</script>';
            } else if (filepath.slice(-4) === '.css') {
                return '<style>' + fileToString(file) + '</style>';
            }
            return inject.transform.apply(inject.transform, arguments);
        }
    };

    var faviconOptions = {
        relative: true,
        starttag: 'base64',
        endtag: '"',
        transform: function (filepath, file, i, length) {
            return fileToString(file);
        }
    };

    var cssStream = gulp.src(paths.buildDir + '/styles/styles.min.css');
    var jsStream = gulp.src(paths.buildDir + '/scripts/scripts.min.js');
    var faviconStream = gulp.src(paths.buildDir + '/images/favicon-encoded.txt');

    return gulp.src(paths.buildDir + '/index.html')
        .pipe(inject(es.merge(cssStream, jsStream), options))
        .pipe(inject(faviconStream, faviconOptions))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.buildDir));
};

module.exports = {
    'inject': _inject
};