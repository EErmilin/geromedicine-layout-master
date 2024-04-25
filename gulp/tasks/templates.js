'use strict';

const gulp      = require('gulp');
const config    = require('../config.js')
const $ 		= require('gulp-load-plugins')();
// full list of plugins: pug, debug, plumber, notify.

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = () => {

	return gulp.src(config.app.pug)
		.pipe($.plumber({
				errorHandler: $.notify.onError({
                    title: 'PUG',
                    message: '<%= error.message %>'
				})
		}))
		.pipe($.pug({pretty: true}))
		.pipe(gulp.dest(config.dist.dist))
		
};