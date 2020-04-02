const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps'); // 可以查看错误文件的位置
const through = require('through2');
const webpack = require('webpack-stream');
const { series, parallel, src, dest, watch } = gulp;
const path = require('path');

const logBabelMetadata = () => {
    return through.obj((file, enc, cb) => {
        // console.log(file.babel.test); // 'metadata'
        cb(null, file);
    });
}

const delayReload = (time) => {
    setTimeout(() => {
        connect.reload();
    }, time)
}

const styleTask = () => src('frontend/sass/*.scss')
        .pipe(sass())
        .pipe(dest('public/css'))
        .pipe(connect.reload());
const tplStyleTask = () => src('frontend/modules/**/*.scss')
        .pipe(sass())
        .pipe(dest('frontend/modules'))
        .pipe(connect.reload())

const jsTask = () => src(['frontend/**/*.js', '!frontend/utils/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env'],
            plugins: [{
                post(file) {
                    file.metadata.test = 'metadata';
                }
            }]
        }))
        .pipe(logBabelMetadata())
        // .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.')) // 生成记录位置的sourcemaps文件
        .pipe(dest('public'))
        .pipe(connect.reload());

const htmlTask = () => src('frontend/**/*.html')
        .pipe(dest('public'))
        .pipe(connect.reload());
const imageTask = () => src('frontend/images/**/*')
        .pipe(imagemin())
        .pipe(dest('public/images'))
        .pipe(connect.reload())
const copyTask = () => src('frontend/utils/**/*')
        .pipe(dest('public/utils/'))
const webpackTask = () => src('frontend/modules/**/*.art')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(dest('public'))
        .pipe(connect.reload());
const cleanTask = () => src('public/', { allowEmpty: true })
        .pipe(clean());
const watchTask = () => watch(['frontend/**/*.html', 'frontend/**/*.js', 'frontend/sass/*.scss', 'images/*', 'frontend/modules/**/*.scss'], (cb) => {
    jsTask();
    htmlTask();
    styleTask();
    tplStyleTask();
    imageTask();
    copyTask();
    // webpackTask();
    cb();
})

const defaultTack = series(cleanTask, jsTask, htmlTask, styleTask, imageTask, copyTask, parallel(watchTask, webpackTask));
const webserver = () => {
    defaultTack();
    connect.server({
    root: './public/',
    livereload: true,
    port: 8801,
    });
}
exports.dev = series(webserver);
exports.build = series(cleanTask, jsTask, htmlTask, styleTask, imageTask, copyTask );