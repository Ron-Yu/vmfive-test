var gulp = require('gulp');
var config = require('./gulpfile_config');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var browserSync = require('browser-sync').create();

//  -------------------------------------
//  Utility function
//  -------------------------------------
//
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.bgYellow.white(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.underline.bold.bgBlue(msg));
    }
}
//
//  -------------------------------------



//  -------------------------------------
//  Task: list
//  -------------------------------------
//
gulp.task('list', function() {
    log('list all tasks registered');
    $.taskListing();
});
//
//  -------------------------------------



//  -------------------------------------
//  Task: build
//  -------------------------------------
//
gulp.task('build', ['compile:js', 'compile:css', 'compile:html']);
//
//  -------------------------------------



//  -------------------------------------
//  Task: copy:js
//  -------------------------------------
//
gulp.task('compile:js', function() {
    log('Compile src/js --> build/js');
    return gulp
        .src(config.src.js)
        .pipe($.plumber())
		.pipe($.babel({
			presets: ['es2015']
		}))
        .pipe($.using({
            prefix: 'copy:js',
            color: 'yellow'
        }))
        .pipe(gulp.dest(config.build.js))
        .pipe(browserSync.stream())
});
//
//  -------------------------------------



//  -------------------------------------
//  Task: watch:js
//  -------------------------------------
//
gulp.task('watch:js', ['compile:js'], browserSync.reload);
//
//  -------------------------------------



//  -------------------------------------
//  Task: compile:css
//  -------------------------------------
//
gulp.task('compile:css', function() {
    log('Compiling Sass --> CSS');
    return gulp
        .src(config.src.sass)
        .pipe($.cached('compile:css'))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.using({
            prefix: 'compile:css',
            color: 'yellow'
        }))
        .pipe($.sass({
            indentedSyntax: true
        }))
        .pipe($.rucksack({
            autoprefixer: true
        }))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build.css))
        .pipe(browserSync.stream())
});
//
//  -------------------------------------



//  -------------------------------------
//  Task: watch:css
//  -------------------------------------
//
gulp.task('watch:css', ['compile:css'], browserSync.reload);
//
//  -------------------------------------



//  -------------------------------------
//  Task: compile:html
//  -------------------------------------
//
gulp.task('compile:html', function() {
    log('Compiling Jade --> HTML');
    return gulp
        .src(config.src.template)
        .pipe($.plumber())
        .pipe($.using({
            prefix: 'compile:html',
            color: 'yellow'
        }))
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.build.html))
        .pipe(browserSync.stream())
});
//
//  -------------------------------------



//  -------------------------------------
//  Task: watch:html
//  -------------------------------------
//
gulp.task('watch:html', ['compile:html'], browserSync.reload);
//
//  -------------------------------------



//  -------------------------------------
//  Task: serve
//  -------------------------------------
//
gulp.task('serve', ['build'], function() {

    log('browser-sync starts');

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch(config.src.js, ['watch:js']);
    gulp.watch(config.src.sass, ['watch:css']);
    gulp.watch(config.src.template, ['watch:html']);
});
//  -------------------------------------



//  -------------------------------------
//  Task: default
//  -------------------------------------
//
gulp.task('default', ['list', 'serve']);
//
//  -------------------------------------
