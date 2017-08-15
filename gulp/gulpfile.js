var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var frontnote = require('gulp-frontnote');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.watch(['js/**/*.js','!js/min/**/*.js'],['js']);
    gulp.watch('sass/**/*.scss',['sass']);
});

gulp.task('sass', function() {
    gulp.src('sass/**/*scss')
        .pipe(frontnote({
            css: '../css/style.css'
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
});

gulp.task('js', function() {
    gulp.src(['js/**/*.js', '!js/min/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./js/min'));
});
