'use strict';
const gulp = require('gulp'),
    browserSync = require('browser-sync').create(), // Обновляет страницу
    plumber = require('gulp-plumber'), // Удерживает консоль в рабочем состоянии при ошибке
    rename = require('gulp-rename'), // Переименование файлов
    uglify = require('gulp-uglify'), // Минификация JS
    pump = require('pump'); // Доп. пакет для minifiers(js)

gulp.task('connect', function () {
    browserSync.init({
        server: './'
    });
    gulp.watch([
        '*.html'
    ], ['hotReloadHtml']);
    gulp.watch([
        '*.js'
    ], ['hotReloadJs']);
});

gulp.task('hotReloadHtml', function () {
    browserSync.reload();
});

gulp.task('hotReloadJs', function (cb) {
    pump([
        gulp.src(['app/js/*.js', '!app/js/*.min.js']),
        plumber(),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('app/js/')
    ], cb);
    browserSync.reload();
});

gulp.task('default', ['connect', 'hotReloadHtml', 'hotReloadJs']);