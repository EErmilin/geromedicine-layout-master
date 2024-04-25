'use strict';

const gulp  		= require('gulp');
const config 	    = require('./gulp/config.js');
const browserSync   = require('browser-sync').create();

function lazyRequireTask(taskName, path) {
	gulp.task(taskName, () => {
		let task = require(path);
		return task();
	});
}

// *** If you want to use incremental template build, you need to uncomment 16, 51 - 54 line & comment 19, 57 line *** START
lazyRequireTask('templates',	'./gulp/tasks/template-incremental-build.js');
// *** If you want to use incremental template build, you need to uncomment 16, 51 - 54 line & comment 19, 57 line *** END

//lazyRequireTask('templates',	'./gulp/tasks/templates.js');

lazyRequireTask('styles',		'./gulp/tasks/styles.js');
lazyRequireTask('js', 			'./gulp/tasks/js.js');
// lazyRequireTask('js-modules', 		'./gulp/tasks/js-modules.js');
lazyRequireTask('js-libs', 	    './gulp/tasks/js-libs.js');
lazyRequireTask('img', 			'./gulp/tasks/img.js');
lazyRequireTask('fonts', 		'./gulp/tasks/fonts.js');
lazyRequireTask('clean', 		'./gulp/tasks/clean.js');

// usePolling - chokidar solution for faster resave files
gulp.task('watch:dev', () => {

  browserSync.init({
    server: config.dist.dist,
    notify: false
  });

// *** If you want to use incremental template build, you need to uncomment 16, 51 - 54 line & comment 19, 57 line *** START
	gulp.watch(config.watch.pug, { usePolling: true }, gulp.series('templates'))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
    	});
// *** If you want to use incremental template build, you need to uncomment 16, 51 - 54 line & comment 19, 57 line *** END

	//gulp.watch(config.watch.pug, { usePolling: true }, gulp.series('templates'));

  gulp.watch(config.watch.html).on('change', browserSync.reload);

	gulp.watch(config.watch.styles, { usePolling: true }, gulp.series('styles'));

  gulp.watch(config.watch.css).on('change', browserSync.reload);

  gulp.watch([config.watch.scripts, '!'+config.watch.scriptsLibs, '!'+config.watch.scriptsModules, '!'+config.watch.scriptsBackend], { usePolling: true }, gulp.series('js'));

	// gulp.watch(config.watch.scriptsModules, { usePolling: true }, gulp.series('js-modules'));

  gulp.watch(config.watch.scrModulesProd).on('change', browserSync.reload);

	gulp.watch(config.watch.scriptsLibs, { usePolling: true }, gulp.series('js-libs'));

	gulp.watch(config.watch.img, gulp.series('img'));

	gulp.watch(config.watch.fonts, gulp.series('fonts'));

});



// Finish line, prepare project for production without optimization
gulp.task('build:dev', gulp.series(
	'clean',
	gulp.parallel(
		"templates",
		"styles",
		"js",
    // "js-modules",
		"js-libs",
		"img",
		"fonts"
	)
));


//set env for absolute build optimization
gulp.task('set-prod', function(){
	process.env.NODE_ENV = "production";
	return gulp.src('./');
});
	// Finish line, prepare project for production with optimization
	gulp.task('build', gulp.series('set-prod', 'build:dev'));


// First Step
// Rebuild the whole project, start watching files & turn on local server
gulp.task('default', gulp.series('build:dev', gulp.parallel('watch:dev')));
