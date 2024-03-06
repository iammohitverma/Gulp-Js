

import gulp from 'gulp';
import sass from 'gulp-dart-sass'; // Use gulp-dart-sass instead of gulp-sass
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import concat from 'gulp-concat'; // Import gulp-concat
import terser from 'gulp-terser';

const { series, src, dest, watch } = gulp;



// Create functions...

// scss
function compilescss() {
    // Match SCSS files in 'assets/scss/' and its subdirectories
    return src('assets/scss/main.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(minify())
        .pipe(dest('assets/css/min/'))
}

function anotherFolderCompilescss() {
    // Match SCSS files in 'assets/scss/' and its subdirectories
    return src('assets/anotherFolder/scss/main.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(minify())
        .pipe(dest('assets/anotherFolder/css/min/'));
}

// Concatenate CSS files
function concatcss() {
    return src('assets/css/min/*.css') // Change the source to the directory containing your minified CSS files
        .pipe(concat('all.min.css')) // Concatenate all CSS files into one file (all.min.css)
        .pipe(dest('assets/css/')); // Output the concatenated file to the specified directory
}

function jsmin() {
    return src('assets/js/*.js')
        .pipe(concat('all.min.js')) // Concatenate all JS files into one file (all.min.js)
        .pipe(terser())
        .pipe(dest('assets/js/min/'));
}

// Create watch task
function watchTask() {
    watch('assets/scss/**/*.scss', compilescss); // Use glob pattern to match all SCSS files in 'assets/scss/'
    watch('assets/anotherFolder/scss/**/*.scss', anotherFolderCompilescss); // Use glob pattern to match all SCSS files in 'assets/anotherFolder/scss/'
    watch('assets/js/*.js', jsmin);
}



// default gulp
export default series(
    compilescss,
    anotherFolderCompilescss,
    concatcss,
    jsmin,
    watchTask
)
