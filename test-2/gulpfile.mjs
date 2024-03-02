// list deps
import { src, dest, watch, series } from 'gulp';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import imagewebp from 'gulp-webp';

// Create functions

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
