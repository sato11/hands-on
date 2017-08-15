var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var frontnote = require('gulp-frontnote');
var uglify = require('gulp-uglify');
var browser = require('browser-sync');

gulp.task('server', function() {
    browser({
        server: {
            baseDir: './'
        }
    });
});;

gulp.task('js', function() {
    gulp.src(['js/**/*.js', '!js/min/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./js/min'));
});

gulp.task('sass', function() {
    gulp.src('sass/**/*scss')
        .pipe(frontnote({
            css: '../css/style.css'
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'))
        .pipe(browser.reload({stream:true}));
});

gulp.task('default', ['server'], function() {
    gulp.watch(['js/**/*.js','!js/min/**/*.js'],['js']);
    gulp.watch('sass/**/*.scss',['sass']);
});

