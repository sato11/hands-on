const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const browser      = require('browser-sync');
const frontnote    = require('gulp-frontnote');
const plumber      = require('gulp-plumber');
const sass         = require('gulp-sass');
const uglify       = require('gulp-uglify');

gulp.task('server', function() {
    browser({
        server: {
            baseDir: './'
        }
    });
});;

gulp.task('js', function() {
    gulp.src(['js/**/*.js', '!js/min/**/*.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./js/min'));
});

gulp.task('sass', function() {
    gulp.src('sass/**/*scss')
        .pipe(plumber())
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

