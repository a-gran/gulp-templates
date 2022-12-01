// Load plugins
var autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    plugins = require('gulp-load-plugins'),
    bower = require('gulp-bower'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    del = import('del'),
    filesExist = require('files-exist'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    sourcemaps = require('gulp-sourcemaps'),

    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source');

const $ = plugins();

gulp.task('run_bower', function() {
  return bower();
});

// CSS TASKS

cssFiles = [
    'bower_components/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/bower_components/toastr/toastr.min.css',
    'bower_components/bower_components/select2/dist/css/select2.min.css',
    'bower_components/bower_components/datepicker/css/datepicker.css',
    'bower_components/bower_components/clockpicker/dist/bootstrap-clockpicker.min.css',
    'bower_components/bower_components/tether/dist/css/tether.min.css',
    'bower_components/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css',
    'bower_components/bower_components/datatables.net-responsive-dt/css/responsive.dataTables.min.css',
    'bower_components/bower_components/intro.js/minified/introjs.min.css',
    'bower_components/bower_components/sumoselect/sumoselect.css',
    'bower_components/bower_components/slick-carousel/slick/slick.css',
    'bower_components/bower_components/slick-carousel/slick/slick-theme.css',
];

gulp.task('concat_css', function() {
  return gulp.src(filesExist(cssFiles))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('apps/static_files/css'));
});

gulp.task('clean_styles', function() {
  return del(['apps/static_files/static/css', ]);
});

gulp.task('scss', function () {
  return gulp.src("apps/static_files/scss/**/*.scss")
    .pipe($.sass({
      includePaths: ['node_modules/foundation-emails/scss']
    }).on('error', $.sass.logError))
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'})).on('error', function(e){
    console.log(e.messageOriginal);
    console.log(e.stack);
    })
    .pipe(autoprefixer(['last 15 versions']))
    // .pipe(cleanCSS())
    .pipe(gulp.dest("apps/static_files/css"))
});


// Stupid ajax-loader.gif that is expected to be in /static/css on the server
// But because we delete the css dir in steps above, we need to copy it
gulp.task('copy-raw-css', function() {
  return gulp.src('apps/static_files/raw-css/**/*')
    .pipe(gulp.dest('apps/static_files/css'));
});


// JSS TASKS


// Transpile es6 files and place in dist
gulp.task('transpile_js', function() {
  return gulp.src("apps/static_files/js/src/**/*.es6")
    .pipe(babel({presets: ['@babel/env'], babelrc: false}))
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('apps/static_files/js/dist'))
});

// Copy normal js files to dist
gulp.task('copy_js', function() {
  return gulp.src("apps/static_files/js/src/**/*.js")
    .pipe(gulp.dest('apps/static_files/js/dist'))
});

// Bundle hm_common
gulp.task('hm_common', function() {
  return gulp.src(filesExist([
    'bower_components/bower_components/jquery/dist/jquery.min.js',
    'bower_components/bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
    'bower_components/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bower_components/metisMenu/dist/metisMenu.min.js',
    'bower_components/bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
    'bower_components/bower_components/moment/moment.js',
    'bower_components/bower_components/select2/dist/js/select2.min.js',
    'bower_components/bower_components/datepicker/js/bootstrap-datepicker.js',
    'bower_components/bower_components/clockpicker/dist/jquery-clockpicker.min.js',
    'bower_components/bower_components/tether/dist/js/tether.min.js',
    'bower_components/bower_components/toastr/toastr.min.js',
    'bower_components/bower_components/intro.js/minified/intro.min.js',
    'bower_components/bower_components/sumoselect/jquery.sumoselect.min.js',
    'apps/static_files/js/dist/modal.js',
    'apps/static_files/js/dist/main.js',
    ]))
    .pipe(concat('hm_common.js'))
    .pipe(gulp.dest('apps/static_files/js/dist'));
});

// Bundle hm_landing
gulp.task('hm_landing', function() {
  return gulp.src(filesExist([
    'bower_components/bower_components/jquery/dist/jquery.min.js',
    'bower_components/bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
    'bower_components/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bower_components/metisMenu/dist/metisMenu.min.js',
    'bower_components/bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
    'bower_components/bower_components/moment/moment.js',
    'bower_components/bower_components/select2/dist/js/select2.min.js',
    'bower_components/bower_components/datepicker/js/bootstrap-datepicker.js',
    'bower_components/bower_components/clockpicker/dist/jquery-clockpicker.min.js',
    'bower_components/bower_components/tether/dist/js/tether.min.js',
    'bower_components/bower_components/toastr/toastr.min.js',
    'bower_components/bower_components/intro.js/minified/intro.min.js',
    'bower_components/bower_components/sumoselect/jquery.sumoselect.min.js',
    'apps/static_files/js/dist/modal.js',
    'apps/static_files/js/dist/main.js',
    'bower_components/bower_components/slick-carousel/slick/slick.js',
    'apps/static_files/js/dist/landing/main.js',
    ]))
    .pipe(concat('hm_landing.js'))
    .pipe(gulp.dest('apps/static_files/js/dist'));
});

gulp.task('app_plugins', function() {
  return gulp.src("apps/static_files/js/dist/app_plugins/**/*.js")
    .pipe(concat('app_plugins.js'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('apps/static_files/js/dist'));
});

// Emails
//CONVERTE INKY
gulp.task('inky', function() {
    return gulp.src('apps/templates/foundation_emails/**/*.{html,txt}')
        .pipe(inlinesource())
        .pipe(inky())
        .pipe(inlineCss({
            preserveMediaQueries: true,
            removeLinkTags: false
        }))
        .pipe(gulp.dest('apps/templates'))
});


// All js bundles (add any new js bundle tasks here too)

gulp.task('js_bundles', gulp.series('copy_js', 'transpile_js', 'app_plugins', 'hm_landing', 'hm_common'));
gulp.task('js_bundles_watch', gulp.series('copy_js', 'transpile_js', 'app_plugins'));
gulp.task('emails', gulp.series('scss', 'inky'));
gulp.task('default', gulp.series('scss', 'run_bower', 'concat_css', 'copy-raw-css', 'clean_styles', 'js_bundles', 'inky'));

// Watch tasks.
gulp.task('watch', function() {
  gulp.watch(['apps/templates/foundation_emails/**/*.html'], gulp.series('scss', 'inky'));
  gulp.watch(['apps/static_files/scss/**/*.scss'], gulp.series('scss'));
  gulp.watch(['apps/static_files/js/src/**/*.es6'], gulp.series('js_bundles_watch'));
  gulp.watch(['apps/static_files/js/src/**/*.js'], gulp.series('copy_js'));
  gulp.watch(['apps/static_files/js/src/**/*main.js'], gulp.series('hm_common', 'hm_landing'));
});
