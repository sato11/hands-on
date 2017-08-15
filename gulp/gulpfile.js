var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var frontnote = require('gulp-frontnote');

gulp.task('sass', function() {
    gulp.src('sass/**/*scss')
        .pipe(frontnote({
            css: '../css/style.css'
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
});
