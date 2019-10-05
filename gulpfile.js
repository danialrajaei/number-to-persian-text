const { src, dest, watch } = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var header = require('gulp-header');

function js() {
    return src('./src/index.js', { sourcemaps: false })
        .pipe(header('\ufeff'))
        .pipe(dest('dist/', { sourcemaps: true }))
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/', { sourcemaps: false }))
}



exports.default = js

exports.watch = function () {
    watch(['./src/index.js'], js);
}