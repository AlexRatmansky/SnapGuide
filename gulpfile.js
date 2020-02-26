const gulp = require('gulp');

gulp.task('copyStatic', () => {
  return gulp.src('./static/**/*').pipe(gulp.dest('./dist'));
});