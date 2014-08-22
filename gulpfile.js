var gulp = require('gulp');
    qunit = require('gulp-qunit')
    uglify = require('gulp-uglify');
    rename = require("gulp-rename");
    cssmin = require('gulp-cssmin');
    compass = require('gulp-compass');
    webserver = require('gulp-webserver');
    connect = require('gulp-connect');
    jshint = require('gulp-jshint');

var paths = {
  ROOT_DIR: '.',
  SASS_DIR: 'sass',
  CSS_DIR: 'css',
  SASS_THEME_DIR: 'css/theme/source',
  CSS_THEME_DIR: 'css/theme',

  init: function () {
    this.SASS = this.SASS_THEME_DIR + '**/*.scss';
    return this;
  }
}.init();

// Cannot use gulp-webserver
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});


gulp.task('qunit', function() {
  return gulp.src('./test/*.html')
    .pipe(qunit());
});

gulp.task('compress', function() {
  gulp.src('js/reveal.js')
    .pipe(uglify())
    .pipe(rename("reveal.min.js"))
    .pipe(gulp.dest('js/'));
});

gulp.task('cssmin', function () {
    gulp.src('css/reveal.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.CSS_DIR));
});

// Please make sure to add css and sass options
// with the same value in config.rb
// compass can't output css result directly.
gulp.task('compass', function () {
  return gulp.src(paths.SASS)
    .pipe(compass({
      config_file: 'config.rb',
      bundle_exec: true,
      css: paths.CSS_THEME_DIR,
      sass: paths.SASS_THEME_DIR,
      sourcemap: true
    }))
    .pipe(gulp.dest(paths.CSS_THEME_DIR));
});

gulp.task('lint', function() {
  return gulp.src([ 'gulpfile.js', 'js/reveal.js' ])
    .pipe(jshint());
});

gulp.task('default', ['qunit', 'compress']);
