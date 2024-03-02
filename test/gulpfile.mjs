
import gulp from 'gulp';
import sass from 'gulp-dart-sass'; // Use gulp-dart-sass instead of gulp-sass
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg'; // Import the MozJPEG plugin
import optipng from 'imagemin-optipng'; // Import the OptiPNG plugin
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
    return src('assets/images/*.{jpg,png}')
        .pipe(imagemin([
            mozjpeg({ quality: 70, progressive: true }), // Use the imported MozJPEG plugin
            optipng({ optimizationLevel: 2 }), // Use the imported OptiPNG plugin
        ]))
        .on('error', function(err) {
            console.error('Error optimizing images:', err);
        })
        .pipe(dest('assets/images/'));
}

// convert from all images to webp images
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
