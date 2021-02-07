const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


function styles() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
}

function reload(done) {
    browserSync.reload();
    done();
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    done();
}

function watch() {
    gulp.watch('app/scss/**/*.scss', gulp.series(styles, reload));
    gulp.watch('*.html', reload);
    gulp.watch('app/js/**/*.js', reload);
}

exports.default = gulp.series(styles, serve, watch);