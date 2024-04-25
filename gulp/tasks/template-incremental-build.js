'use strict';

const gulp      = require('gulp');
const config    = require('../config.js')
const emitty    = require('emitty').setup('src/templates', 'pug');
const $ 		    = require('gulp-load-plugins')();
// full list of plugins: pug, debug, plumber, notify.

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = () => {
	return new Promise((resolve, reject) => {
		emitty.scan(global.emittyChangedFile).then(() => {
			gulp.src(config.app.pug)
        .pipe($.plumber({
          errorHandler: $.notify.onError({
            title: 'PUG',
            message: '<%= error.message %>'
          })
        }))
				.pipe($.if(isDevelopment, emitty.filter(global.emittyChangedFile)))
				.pipe($.pug({ pretty: true }))
				.pipe($.debug({title: "Emitty: "}))
				.pipe(gulp.dest(config.dist.dist))
				.on('end', resolve)
				.on('error', reject);
		});
	})

};
