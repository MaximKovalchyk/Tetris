var gulp = require('gulp'),
  concat = require('gulp-concat');

gulp.task('build_js', function() {
  return gulp.src('./js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./builds/'));
});

gulp.task('build_css', function() {
  return gulp.src('./css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./builds/'));
});

gulp.task('default', ['build_js', 'build_css']);
