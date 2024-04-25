'use strict';

const gulp  		= require('gulp');
const config 	    = require('../config.js');
const fileinclude   = require('gulp-file-include');
const $ 			= require('gulp-load-plugins')();
// full list of plugins: rename


module.exports = () => {

	return gulp.src(config.app.scriptsModules)
    // .pipe($.plumber({
    //   errorHandler: $.notify.onError({
    //     title: "Java Script Modules",
    //     message:"<%= error.message %>"
    //   })
    // }))
		.pipe(fileinclude({
				prefix:   '@@',
				basepath: '@file'
		}))
    //.pipe($.babel())
		.pipe(gulp.dest(config.dist.scriptsModules))

};