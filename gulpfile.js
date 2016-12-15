'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    imagemin = require('gulp-imagemin'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config'),
    concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('concatcss', function (done) {
    gulp.src([
        './library/admindesigns/theme/assets/skin/default_skin/css/theme.css',
        './library/admindesigns/theme/vendor/jquery/jquery_ui/jquery-ui.min.css',
        './library/admindesigns/theme/vendor/plugins/magnific/magnific-popup.css',
        './library/datatables/datatables/media/css/jquery.dataTables.min.css',
        './library/datatables/datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css',
        './library/bootstrap/daterangepicker/daterangepicker.css',
        './library/jquery_plugins/tooltipster/dist/css/tooltipster.bundle.min.css',
        './library/jquery_plugins/tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-borderless.min.css',
        './library/admindesigns/theme/assets/admin-tools/admin-forms/css/admin-forms.css',
        './library/admindesigns/theme/vendor/plugins/slick/slick.css',
        './library/jquery_plugins/zTree_v3/css/metroStyle/metroStyle.css',
        './library/admindesigns/theme/vendor/plugins/datepicker/css/bootstrap-datetimepicker.css',
        './library/admindesigns/theme/vendor/plugins/select2/css/core.css',
        './library/admindesigns/theme/vendor/plugins/select2/css/theme/classic/layout.css',
        './library/admindesigns/theme/assets/fonts/octicons/octicons.css',
        './library/pdfjs/web/pdf_viewer.css',
        './library/jquery_plugins/lightbox2/css/lightbox.min.css',
        './dist/stylesheets/vendor/font-awesome/font-awesome.css'
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/stylesheets/'))
        .on('end', done);
});

gulp.task('imagemin', function() {
    return gulp.src('./src/assets/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets'))
});

gulp.task('copyHtml', function() {
    return gulp.src(['./src/**/*.html', '!./src/new_codes/**/*.html'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    return gulp.src(['dist'], {
            read: false
        })
        .pipe(clean());
});

gulp.task("webpack", function() {
    return gulp.src('./')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('watch', function () {

    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/**/*.html', '!./src/new_codes/**/*.html'], ['copyHtml']);
    gulp.watch('./src/assets/**/*', ['imagemin']);
    gulp.watch('./src/new_codes/**/*.js', ['concatJs']);
    gulp.watch('./src/new_codes/**/*.css', ['concatCss']);
    gulp.watch('./src/new_codes/**/*.html', ['copyHtmlTest']);
    // gulp.watch('./src/scripts/**/*', ['webpack']);
});

gulp.task('revision', function () {
    return gulp.src([
            'dist/**/*',
            '!dist/*.html'
        ])
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/'))
});

gulp.task("revreplace", function(){

    var manifest = gulp.src("dist/rev-manifest.json");

    return gulp.src("dist/**/*")
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('dist'));
});


gulp.task('default', function() {
    runSequence('clean',
        ['sass', 'concatcss', 'imagemin', 'webpack', 'copyHtml']
    );
});

gulp.task('production', function() {
    runSequence('clean',
        ['sass', 'concatcss', 'imagemin', 'webpack', 'copyHtml'],
        'revision',
        'revreplace'
    );
});
/********************测试代码*************************/
gulp.task('copyHtmlTest', function() {
    return gulp.src('./src/new_codes/**/*.html')
        .pipe(gulp.dest('./dist/templates'));
});
gulp.task('concatCss', function() {
    return gulp.src('./src/new_codes/**/*.css')
        .pipe(concat('new_style.css'))
        .pipe(gulp.dest('./dist/stylesheets'))
});
gulp.task('concatJs', function() {
    return gulp.src(['./src/new_codes/**/*.js', '!./src/new_codes/new.root.module.js'])
        .pipe(concat('new_codes.js'))
        .pipe(gulp.dest('./dist/scripts'))
});
gulp.task('copyJs', function() {
    return gulp.src(['./src/new_codes/new.root.module.js'])
        .pipe(gulp.dest('./dist/scripts'))
});
gulp.task('test', function() {
    runSequence('clean',
        ['sass', 'imagemin', 'webpack', 'copyHtml', 'copyHtmlTest', 'concatJs','concatcss', 'concatCss', 'copyJs']
    );
});