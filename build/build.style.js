const { series, src, dest } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
// todo
const autoprefixer = require('gulp-autoprefixer');

// 编译sass
const compileCss = function () {
    return src('../src/styles/index.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename('xue.css'))
        .pipe(dest('../dist/styles'));
}

// 拷贝字体文件
const removeFonts = function () {
    return src('../src/styles/iconfont/fonts/*.*')
        .pipe(dest('../dist/styles/fonts'));
}

exports.default = series(compileCss, removeFonts);