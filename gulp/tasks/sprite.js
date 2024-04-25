'use strict';

const gulp  		= require('gulp');
const config 		= require('../config.js');
const svgSprite 	= require('gulp-svg-sprite');
const $ 			= require('gulp-load-plugins')();
// full list of plugins: gulpif, changed, replace, cheerio, svgmin


module.exports = () => {
	return gulp.src(config.app.sprite)

		// minify svg
		.pipe($.svgmin({
			js2svg: {
				pretty: true
			}
		}))

		// remove all fill, style and stroke declarations in out shapes
		.pipe($.cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
				$('[opacity]').removeAttr('opacity');
				$('title').remove();
				$('path')
					.removeAttr('mask')
					.attr('fill', 'currentColor');
			},
			parserOptions: {xmlMode: true}
		}))

		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe($.replace('&gt;', '>'))

		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					bust  : false,
					dest  : ".",
					sprite: config.app.spriteFile,
					render: {
						scss: {
							dest: "../"+ config.app.spriteStyles + "sprite.scss",
							template: config.app.spriteStyles + "sprite-template.scss"
						}
					}
				}
			}
		}))

	.pipe(gulp.dest(config.dist.dist));
	
};