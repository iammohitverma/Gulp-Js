// // list deps
// const { src, dest, watch, series } = require('gulp');
// const sass = require('gulp-sass');
// const prefix = require('gulp-autoprefixer');
// const minify = require('gulp-clean-css');
// const terser = require('gulp-terser');
// const imagemin = require('gulp-imagemin');
// const imagewebp = require('gulp-webp');


import gulp from 'gulp';
// import sass from 'gulp-sass'; //not working for me that's why gulp-dart
import sass from 'gulp-dart-sass'; // Use gulp-dart-sass instead of gulp-sass
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import imagewebp from 'gulp-webp';

const { series, src, dest, watch } = gulp;


// Create functions...

// scss
function compilescss() {
    return src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(minify())
        .pipe(dest('assets/css/min/'))
}

// js
function jsmin() {
    return src('assets/js/*.js')
        .pipe(terser())
        .pipe(dest('assets/js/min/'))
}

// images
function optimizeimg() {
    return src('assets/images/*.{jpg, png}')
        .pipe(imagemin(
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 2 }),
        ))
        .pipe(dest('assets/images/optimized/'))
}

// webp images
function webpimg() {
    return src('assets/images/*.{jpg, png}')
        .pipe(imagewebp())
        .pipe(dest('assets/images/optimized/'))
}

// Create watch task
function watchTask() {
    watch('assets/scss/*.scss', compilescss);
    watch('assets/js/*.js', jsmin);
    watch('assets/images/*.{jpg, png}', optimizeimg);
    watch('assets/images/*.{jpg, png}', webpimg);
}

// default gulp
export default series(
    compilescss,
    jsmin,
    optimizeimg,
    webpimg,
    watchTask
)
