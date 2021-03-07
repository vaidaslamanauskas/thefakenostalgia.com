/*
                                   ..
                             x .d88"
                 x.    .      5888R    .d``
       uL      .@88k  z88u    '888R    @8Ne.   .u
   .ue888Nc.. ~"8888 ^8888     888R    %8888:u@88N
  d88E`"888E`   8888  888R     888R     `888I  888.
  888E  888E    8888  888R     888R      888I  888I
  888E  888E    8888  888R     888R      888I  888I
  888E  888E    8888 ,888B .   888R    uW888L  888'
  888& .888E   "8888Y 8888"   .888B . '*88888Nu88P
  *888" 888&    `Y"   'YP     ^*888%  ~ '88888F`
   `"   "888E                   "%       888 ^
  .dWi   `88E                            *8E
  4888~  J8%                             '8>
   ^"===*"`                               "

*/

var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var cssnano      = require('gulp-cssnano');
var sass         = require('gulp-sass');
var size         = require('gulp-size');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var cache        = require('gulp-cache');
var child        = require('child_process');
var runSequence  = require('run-sequence');
var browserSync  = require('browser-sync');
var rename       = require('gulp-rename');

/// Uses Sass compiler to process styles, adds vendor prefixes, minifies,
// and then outputs file to appropriate location(s)
gulp.task('styles', function() {
  return gulp.src('_styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 15 versions']}))
    .pipe(cssnano())
    .pipe(rename('kiku.css'))
    .pipe(gulp.dest('styles'))
    .pipe(gulp.dest('_site/styles'))
    .pipe(browserSync.reload({stream:true}))
    .on('error', gutil.log);
});

// Concatenates and uglifies JS files and outputs result to
// the appropriate location(s).
gulp.task('scripts', function() {
  return gulp.src('_scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('scripts'))
    .pipe(gulp.dest('_site/scripts'))
    .pipe(browserSync.reload({stream:true}))
    .on('error', gutil.log);
});

// Creates optimized versions of images,
// then outputs to appropriate location(s)
gulp.task('images', function() {
  return gulp.src('_images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('images'))
    .pipe(gulp.dest('_site/images'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
});

// Creates optimized versions of exhibits,
// then outputs to appropriate location(s)
gulp.task('exhibits', function() {
  return gulp.src('_exhibits/**/*.+(png|jpg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('exhibits'))
    .pipe(gulp.dest('_site/exhibits'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
});

// Creates optimized versions of fossils,
// then outputs to appropriate location(s)
gulp.task('fossils', function() {
  return gulp.src('_fossils/**/*.+(png|jpg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('fossils'))
    .pipe(gulp.dest('_site/fossils'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
});

// Creates optimized versions of vectors,
// then outputs to appropriate location(s)
gulp.task('vectors', function() {
  return gulp.src('_vectors/**/*.+(svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('vectors'))
    .pipe(gulp.dest('_site/vectors'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
});



// build jekyll
gulp.task('build', function(done) {
  return child.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit'})
    .on('close', done);
});

// build and reloads browser
gulp.task('rebuild', ['build'], function () {
  browserSync.reload();
});

// refresh the browser
gulp.task('reload', function() {
    browserSync.reload();
});



// Only deletes what's in the site folder
gulp.task('clean:jekyll', function(cb) {
  del(['_site'], cb);
});

// Clean stuff
gulp.task('clean:styles', function() {
  return del.sync('css');
});

gulp.task('clean:scripts', function() {
  return del.sync('js');
});

gulp.task('clean:images', function() {
  return del.sync('images');
});

gulp.task('clean:exhibits', function() {
  return del.sync('exhibits');
});

gulp.task('clean:fossils', function() {
  return del.sync('fossils');
});

gulp.task('clean:vectors', function() {
  return del.sync('vectors');
});



// build pieces
gulp.task('build:styles', function(cb) {
  runSequence('clean:styles', 'styles',  cb);
});

gulp.task('build:scripts', function(cb) {
  runSequence('clean:scripts', 'scripts', 'reload', cb);
});

gulp.task('build:images', function(cb) {
  runSequence('clean:images', 'images', 'reload', cb);
});

gulp.task('build:exhibits', function(cb) {
  runSequence('clean:exhibits', 'exhibits', 'reload', cb);
});

gulp.task('build:fossils', function(cb) {
  runSequence('clean:fossils', 'fossils', 'reload', cb);
});

gulp.task('build:vectors', function(cb) {
  runSequence('clean:vectors', 'vectors', 'reload', cb);
});



// Ports
gulp.task('browser-sync', function() {

  browserSync.init({
  server: {
            baseDir: "_site"
        },
  ui: {
      port: 9001
    },
  port: 9000

  });
});



// Rolex watches
gulp.task('watch', function(){
  gulp.watch('_styles/**/*.scss', ['build:styles']);
  gulp.watch('_scripts/**/*.js', ['build:scripts']);
  gulp.watch('_images/**/*.+(png|jpg|gif|svg)', ['build:images']);
  gulp.watch('_exhibits/**/*.+(png|jpg)', ['build:exhibits']);
  gulp.watch('_fossils/**/*.+(png|jpg)', ['build:fossils']);
  gulp.watch('_vectors/**/*.+(svg)', ['build:vectors']);
  gulp.watch(['*.html', '_posts/*', '_includes/_partials/*.html', '*/*.html'], ['rebuild']);
});

// Output default build
gulp.task('default', function (cb) {
  runSequence(['build:scripts', 'build:images', 'build:vectors', 'build:styles'], 'build', 'browser-sync', 'watch', cb);
});

// Output production build
gulp.task('production', function(cb) {
    runSequence(['build:scripts', 'build:images', 'build:exhibits', 'build:fossils', 'build:vectors', 'build:styles'], 'build', cb);
});