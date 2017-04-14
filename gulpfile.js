const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const htmllint = require('gulp-htmllint')
const gutil = require('gulp-util');
const csslint = require('gulp-csslint');
const cssbeautify = require('gulp-cssbeautify');
const jsbeautify = require('gulp-jsbeautify');

const buildDir = "./docs";

gulp.task('clean', function() {
    return del([buildDir]);
});

gulp.task('build-css', ['clean'], function() {
    return gulp.src(['styles/reset.css', 'styles/main.css', 'styles/!(reset|main)*.css'])
        .pipe(concat('styles.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(buildDir + '/styles'));
});

gulp.task('copy-images', ['clean'], function() {
    return gulp.src('./images/**')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            })
        ]))
        .pipe(gulp.dest(buildDir + '/images'));
});

gulp.task('copy-html', ['clean'], function() {
    return gulp.src('index.html')
        .pipe(gulp.dest(buildDir));
});

gulp.task('inject-html', ['copy-html', 'build-css', 'copy-images'], function() {
    var options = {
        relative: true
    };
    var cssStream = gulp.src(buildDir + '/styles/styles.min.css');
    return gulp.src(buildDir + '/index.html')
        .pipe(inject(cssStream, options))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('htmllint', function() {
    var options = {
        config: "htmllint.json"
    };
    return gulp.src('index.html')
        .pipe(htmllint(options, htmllintReporter));
});

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function(issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') +
                gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') +
                gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}

gulp.task('csslint', function() {
    gulp.src('styles/*.css')
        .pipe(csslint({
            "box-sizing": false
        }))
        .pipe(csslint.formatter());
});

gulp.task('format-css', function() {
    gulp.src('styles/*.css')
        .pipe(cssbeautify())
        .pipe(gulp.dest('./styles/'));;
});

gulp.task('format-js', function() {
    gulp.src('*.js')
        .pipe(jsbeautify())
        .pipe(gulp.dest('.'));;
});

gulp.task('lint', ['htmllint', 'csslint']);
gulp.task('format', ['format-css', 'format-js']);
gulp.task('default', ['inject-html']);