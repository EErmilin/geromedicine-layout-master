'use strict';

const gulp  		= require('gulp');
const config 	    = require('../config.js');
const fileinclude   = require('gulp-file-include');
const $ 			= require('gulp-load-plugins')();
// full list of plugins: rename


module.exports = () => {

	return gulp.src(config.app.scriptsLibs)
		.pipe(fileinclude({
				prefix:   '@@',
				basepath: '@file'
		}))
		.pipe($.rename({suffix: '.min'}))
		.pipe(gulp.dest(config.dist.scripts))

};