const gulp = require('gulp');
const htmllint = require('gulp-htmllint')
const csslint = require('gulp-csslint');
const jslint = require('gulp-jslint');

function lintHtml() {
    var options = {
        config: 'htmllint.json'
    };
    return gulp.src('index.html')
        .pipe(htmllint(options, htmllintReporter));
}

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') +
                gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') +
                gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}

function lintCss() {
    gulp.src('styles/*.css')
        .pipe(csslint({
            'box-sizing': false,
            'order-alphabetical': false
        }))
        .pipe(csslint.formatter());
}

function lintJs() {
    var options = {
        'global': ['document'],
        'for': true
    };
    return gulp.src(['scripts/*.js'])
        .pipe(jslint(options))
        .pipe(jslint.reporter('default'));
}

module.exports = {
    'lintHtml': lintHtml,
    'lintCss': lintCss,
    'lintJs': lintJs
};