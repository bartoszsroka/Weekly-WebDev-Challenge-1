const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const es = require('event-stream');
const htmllint = require('gulp-htmllint')
const gutil = require('gulp-util');
const jslint = require('gulp-jslint');
const csslint = require('gulp-csslint');

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

gulp.task('build-js', ['clean'], function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'scripts/*.js'])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
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

gulp.task('copy-html', ['clean'], function() {
    return gulp.src('index.html')
        .pipe(gulp.dest(buildDir));
});

gulp.task('inject-html', ['copy-html', 'build-css', 'build-js', 'copy-images'], function() {
    var options = {
        relative: true,
        removeTags: true,
        transform: function (filepath, file, i, length) {
            if (filepath.slice(-3) === '.js') {
                return '<script src="' + filepath + '" async></script>';
            }
            return inject.transform.apply(inject.transform, arguments);
        }
    };

    var jsStream = gulp.src(buildDir + '/scripts/scripts.min.js');
    var cssStream = gulp.src(buildDir + '/styles/styles.min.css');

    return gulp.src(buildDir + '/index.html')
        .pipe(inject(es.merge(jsStream, cssStream), options))
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
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') +
                gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') +
                gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}

gulp.task('jslint', function () {
	var options = {
		global: ['document',  '$'],
		this: true
	};
    return gulp.src(['scripts/*.js'])
            .pipe(jslint(options))
            .pipe(jslint.reporter('default'));
});

gulp.task('csslint', function() {
  gulp.src('styles/*.css')
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task('lint', ['htmllint', 'jslint', 'csslint']);
gulp.task('default', ['inject-html']);