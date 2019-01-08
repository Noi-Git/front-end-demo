var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
browserSync = require('browser-sync').create()

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "dist"
    }
  })
})

gulp.task('deleteDistFolder', function() {
  return del('./dist')
})

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src('./app/assets/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
    }))
    .pipe(gulp.dest('./dist/assets/images'))
})

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start("usemin")
})

gulp.task('usemin', ['deleteDistFolder', 'styles'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}]

    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin'])