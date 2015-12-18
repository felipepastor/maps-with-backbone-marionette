var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var gulp = require('gulp');
var rename = require('gulp-rename');

var paths = {
    sass: ['./app/assets/scss/**/*.scss']
};

gulp.task('sass', function (done) {
    gulp.src('./app/assets/scss/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./app/assets/css/min'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass']);
