'use strict';

const gulp  	= require('gulp');
const config 	= require('../config.js');
const $ 		= require('gulp-load-plugins')();
// full list of plugins: gulpif, changed

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = () => {

	return gulp.src(config.app.img)
		.pipe($.if(isDevelopment,  $.changed(config.dist.img)))
		.pipe(gulp.dest(config.dist.img));

};