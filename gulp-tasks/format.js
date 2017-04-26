const gulp = require('gulp');
const cssbeautify = require('gulp-cssbeautify');
const jsbeautify = require('gulp-jsbeautify');
const htmlbeautify = require('gulp-html-beautify');

function formatCss() {
    return gulp.src('styles/*.css')
        .pipe(cssbeautify())
        .pipe(gulp.dest('./styles/'));
};

function formatJs(source, target) {
    return gulp.src(source)
        .pipe(jsbeautify({
            "space_after_anon_function": true
        }))
        .pipe(gulp.dest(target));
};

function formatWebScripts() {
    return formatJs('scripts/*.js', './scripts/');
};

function formatGulpTasks() {
    return formatJs('gulp-tasks/*.js', 'gulp-tasks/');
};

function formatHtml() {
    return gulp.src('*.html')
        .pipe(htmlbeautify({
            'indent_char': ' ',
            'indent_size': 4
        }))
        .pipe(gulp.dest('.'));
};

module.exports = {
    'formatCss': formatCss,
    'formatJs': formatWebScripts,
    'formatGulpTasks': formatGulpTasks,
    'formatHtml': formatHtml
};