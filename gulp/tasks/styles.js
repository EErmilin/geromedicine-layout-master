'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const $ = require('gulp-load-plugins')();
// full list of plugins: sass, gulpif, soursemaps, autoprefixer, cssnano, rename, plumber, notify

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = () => {

    return gulp.src(config.app.styles)
        .pipe($.plumber({
            errorHandler: $.notify.onError({
                title: "STYLES",
                message: "<%= error.message %>"
            })
        }))
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.if(!isDevelopment, $.autoprefixer({browsers: ['> 1%', 'last 10 versions', 'Firefox ESR']})))
        .pipe($.if(!isDevelopment, $.cssnano()))
        .pipe($.if(isDevelopment, $.sourcemaps.write()))
        .pipe(gulp.dest(config.dist.styles))

};
