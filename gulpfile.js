const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const es = require('event-stream')

const buildDir = "./build";

gulp.task('clean', function() {
    return del([buildDir]);
});

const stylesStream = gulp.src(['./styles/reset.css', './styles/sprites.css', './styles/main.css'])
    .pipe(concat('styles.min.css'))
    .pipe(cssmin())

gulp.task('build-css', ['clean'], function() {
    return stylesStream
        .pipe(gulp.dest(buildDir + '/styles'));
});

const jsStream = gulp.src('./scripts/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify());

gulp.task('build-js', ['clean'], function() {
    return jsStream
        .pipe(gulp.dest(buildDir + '/scripts'));
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

// TODO: Try make relative paths without transform function
gulp.task('copy-html', ['clean'], function() {
    var options = {
        transform: function(filepath) {
            var relativePath = filepath.substring(7);
            if (filepath.slice(-4) === '.css') {
                return '<link rel="stylesheet" href="' + relativePath + '">';
            }
            if (filepath.slice(-3) === '.js') {
                return '<script src="' + relativePath + '"></script>';
            }
            return inject.transform.apply(inject.transform, arguments);
        }
    }
    return gulp.src('./index.html')
        .pipe(inject(es.merge(jsStream, stylesStream), options))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('default', ['build-css', 'build-js', 'copy-images', 'copy-html']);