const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

var prefixStyles = function () {
    gulp.src('styles/*.css')
        .pipe(autoprefixer({
            'flexbox': false,
            'cascade': false
        }))
        .pipe(gulp.dest('styles/'))
};

module.exports = {
    'prefixStyles': prefixStyles
}