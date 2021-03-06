const gulp = require('gulp');
const del = require('del');
const format = require('./gulp-tasks/format.js');
const lint = require('./gulp-tasks/lint.js');
const build = require('./gulp-tasks/build.js');
const copy = require('./gulp-tasks/copy.js');
const inject = require('./gulp-tasks/inject.js');
const paths = require('./gulp-tasks/paths.js');
const clean = require('./gulp-tasks/clean.js');
const prefix = require('./gulp-tasks/autoprefix.js');

gulp.task('clean', clean.clean);

gulp.task('prefix', prefix.prefixStyles);

gulp.task('lintJs', lint.lintJs);
gulp.task('lintCss', lint.lintCss);
gulp.task('lintHtml', lint.lintHtml);
gulp.task('lint', ['lintJs', 'lintCss', 'lintHtml']);

gulp.task('formatCss', format.formatCss);
gulp.task('formatJs', format.formatJs);
gulp.task('formatGulpTasks', format.formatGulpTasks);
gulp.task('formatHtml', format.formatHtml);
gulp.task('format', ['formatCss', 'formatJs', 'formatGulpTasks', 'formatHtml']);

gulp.task('buildCss', ['clean'], build.buildCss);
gulp.task('buildJs', ['clean'], build.buildJs);
gulp.task('build', ['buildCss', 'buildJs']);

gulp.task('copyImages', ['clean'], copy.copyImages);
gulp.task('copyHtml', ['clean'], copy.copyHtml);
gulp.task('copy', ['copyImages', 'copyHtml']);

gulp.task('inject', ['copy', 'build'], inject.inject);
gulp.task('rebuildProd', ['inject'], clean.cleanTempFiles);

gulp.task('default', ['rebuildProd']);