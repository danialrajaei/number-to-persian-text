const { src, dest, watch } = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

function js() {
    return src('./src/index.js', { sourcemaps: false })
        //.pipe(umd())
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/', { sourcemaps: false }))
}



exports.default = js

exports.watch = function () {
    watch(['./src/index.js'], js);
}