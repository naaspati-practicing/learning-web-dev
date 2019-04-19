let isProduction;
const dir = "." + __dirname.replace(process.cwd(), "").replace(/\\/g, '/') + "/";

if (!process.env.css_dest)
    throw new Error("process.env.css_dest not defined");

let temp = process.env.css_dest.replace(/\\/g, '/') + "/";
if (!temp.endsWith('/'))
    temp = temp + "/";

const css_dest = temp;

const config =  {
    scss: dir+'scss/',
    font: css_dest + 'fonts',
    scss_src: [dir+'scss/*.scss', `!${dir}scss/_*.scss`],
    css_dest,
    includePaths: ['node_modules/bootstrap/scss', dir+"scss/"],
    watchDir() { return this.scss_src; }
}

const fs = require('fs');
let gulp;

module.exports = function (data) {
    data.config = config;
    gulp = data.gulp;
    isProduction =  data.isProduction;
    
    return {
        watchDir: config.watchDir(),
        task: maker,
        name: 'css'
    };
};

const rename = require('gulp-rename'),
    print = require('gulp-print').default,
    sourcemaps = require('gulp-sourcemaps'),
    gulp_util = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');
  cache = require('gulp-cached');

function maker() {
    let stream = gulp.src(config.scss_src)
        .pipe(cache())
        .pipe(sass({
                includePaths: config.includePaths
            })
            .on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.css_dest));

    if (isProduction) {
        return stream.pipe(print());
    } else {
        const cssnano = require('gulp-cssnano');

        return stream.pipe(sourcemaps.init())
            .pipe(cssnano())
            .pipe(rename(path => path.basename += '.min'))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.css_dest))
            .pipe(print());
    }
};