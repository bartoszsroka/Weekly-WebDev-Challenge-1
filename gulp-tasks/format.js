const gulp = require('gulp');
const cssbeautify = require('gulp-cssbeautify');
const jsbeautify = require('gulp-jsbeautify');
const htmlbeautify = require('gulp-html-prettify');

function formatCss(){
    return gulp.src('styles/*.css')
        .pipe(cssbeautify())
        .pipe(gulp.dest('./styles/'));
};

function formatJs(){
    return gulp.src('scripts/*.js')
        .pipe(jsbeautify({
            "space_after_anon_function": true
        }))
        .pipe(gulp.dest('./scripts/'));
};

function formatHtml(){
    return gulp.src('*.html')
        .pipe(htmlbeautify({
            'indent_char': ' ',
            'indent_size': 4
        }))
        .pipe(gulp.dest('.'));
};

module.exports = {
    'formatCss': formatCss,
    'formatJs': formatJs,
    'formatHtml': formatHtml
};