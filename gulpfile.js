var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('copy', function() {
    gulp.src('client/*.html').pipe(gulp.dest('server/build'));
    gulp.src('client/images/*.*').pipe(gulp.dest('server/build/images'));
    gulp.src('client/images/enchantjsui/**').pipe(gulp.dest('server/build'));
});

gulp.task('vender-js', function() {
    return gulp.src('client/libs/**/*.js')
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(concat('vender.js'))
      .pipe(gulp.dest('server/build/js'));
});

gulp.task('app-js', function() {
    return gulp.src([
        'client/js/common/common.js',
        'client/js/scene/scenebase.js',
        'client/js/**/*.js'
      ])
      .pipe(concat('app.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('server/build/js'));
});

gulp.task('watch', function() {
    gulp.watch(['client/*.html','client/js/**/*.js'], ['default']);
});
gulp.task('build', ['copy', 'vender-js', 'app-js']);

gulp.task('default', ['copy', 'app-js']);