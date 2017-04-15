const gulp = require('gulp');
const cssbeautify = require('gulp-cssbeautify');
const jsbeautify = require('gulp-jsbeautify');

function formatCss(){
    return gulp.src('styles/*.css')
        .pipe(cssbeautify())
        .pipe(gulp.dest('./styles/'));
};

function formatJs(){
    return gulp.src(['scripts/*.js'])
        .pipe(jsbeautify({
            "space_after_anon_function": true
        }))
        .pipe(gulp.dest('./scripts/'));
};

module.exports = {
    'formatCss': formatCss,
    'formatJs': formatJs
};