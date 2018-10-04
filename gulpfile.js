'use strict';

var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpMap = require('gulp-sourcemaps'),
    gulpUglify = require('gulp-uglify'),
    sassGlob = require('gulp-sass-glob'),
    gulpSass = require('gulp-sass'),
    uglifycss = require('gulp-uglifycss'),
    gulpimage = require('gulp-image'),
    gulpDel = require('del'),
    useref = require('gulp-useref'),
    webserver = require('gulp-webserver');

gulp.task('scripts', function() {
  return gulp.src([
  'js/circle/autogrow.js',
  'js/circle/circle.js',
  'js/global.js'
  ])
  .pipe(gulpMap.init())
  .pipe(gulpConcat('all.min.js'))
  .pipe(gulpUglify())
  .pipe(gulpMap.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function(){
  return gulp.src('sass/global.scss')
  .pipe(sassGlob())
  .pipe(gulpMap.init())
  .pipe(gulpConcat('all.min.css'))
  .pipe(gulpSass())
  .pipe(uglifycss())
  .pipe(gulpMap.write('./'))
  .pipe(gulp.dest('dist/styles'));
});

gulp.task('image', function () {
    return gulp.src('./images/*')
    .pipe(gulpimage())
    .pipe(gulp.dest('dist/content'));
});

gulp.task('copy', function () {
    return gulp.src(['icons/**/*'], {
        base: 'icons'
    }).pipe(gulp.dest('dist/icons'));
});

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('watchFiles', function() {
  gulp.watch('sass/**/*', ['styles']);
});

gulp.task('webserver', ['scripts', 'image', 'html', 'copy', 'watchFiles', 'styles'], function() {
    gulp.src('dist')
    .pipe(webserver({
    livereload: true,
    fallback: 'index.html',
    open: true
  }));
});

gulp.task('clean', function() {
  return gulpDel('dist');
});

gulp.task('build', ['webserver'], function() {

});

gulp.task('default', ['clean'], function() {
  gulp.start('build');

});
