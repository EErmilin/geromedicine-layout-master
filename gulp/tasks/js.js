'use strict';

const gulp  		= require('gulp');
const config 	    = require('../config.js');
const fileinclude   = require('gulp-file-include');
const $ 			= require('gulp-load-plugins')();
// full list of plugins: cached, babel, gulpif, uglify, rename, plumber, notify,


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = () => {

	return gulp.src(config.app.scripts)
		.pipe($.plumber({
				errorHandler: $.notify.onError({
						title: "Java Script",
						message:"<%= error.message %>"
				})
		}))
		.pipe(fileinclude({
				prefix:   '@@',
				basepath: '@file'
		}))
		.pipe($.babel())
		.pipe(gulp.dest(config.dist.scripts))
		
};