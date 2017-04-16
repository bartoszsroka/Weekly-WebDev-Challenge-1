const gulp = require('gulp');
const inject = require('gulp-inject');
const gutil = require('gulp-util');
const es = require('event-stream');
const paths = require('./paths.js');
const htmlmin = require('gulp-htmlmin');

gulp.task('clean', function () {
    return del(paths.buildDir);
});

var _inject = function () {
    var options = {
        relative: true,
        removeTags: true,
        transform: function (filepath, file, i, length) {
            if(filepath.slice(-3) === '.js'){
                return '<script>' +  file.contents.toString('utf8') + '</script>';
            } else if(filepath.slice(-4) === '.css'){
				return '<style>' +  file.contents.toString('utf8') + '</style>';
            }
            return inject.transform.apply(inject.transform, arguments);
        }
    };
    var cssStream = gulp.src(paths.buildDir + '/styles/styles.min.css');
    var jsStream = gulp.src(paths.buildDir + '/scripts/scripts.min.js');
    return gulp.src(paths.buildDir + '/index.html')
        .pipe(inject(es.merge(cssStream, jsStream), options))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.buildDir));
};

module.exports = {
	'inject': _inject
};