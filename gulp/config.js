'use strict';

module.exports = {

    app: {
        pug: 'src/templates/*.pug',
        styles: 'src/styles/*.{sass,scss}',
        scripts: ['src/js/script.js'],
        scriptsLibs: 'src/js/vendor.js',
        scriptsModules: 'src/js/modules/*',
        scriptsBackend: 'src/js/js-for-backend/*',
        fonts: 'src/fonts/**/*',
        img: ['src/images/**/*']
    },

    watch: {
        pug: 'src/templates/**/*.pug',
        html: 'public/*.html',
        styles: 'src/styles/**/*.{sass,scss}',
        css: 'public/css/style.css',
        scripts: 'src/js/**/*.js',
        scriptsLibs: 'src/js/vendor.js',
        scriptsModules: 'src/js/modules/*',
        scrModulesProd: 'public/js/modules/*',
        scriptsBackend: 'src/js/js-for-backend/*',
        fonts: 'src/fonts/**/*',
        img: 'src/images/*'
    },

    dist: {
        dist: 'public/',
        styles: 'public/css/',
        scripts: 'public/js/',
        scriptsModules: 'public/js/modules/',
        scriptsBackend: 'public/js/js-for-backend/',
        img: 'public/images/',
        fonts: 'public/fonts/'
    }

};
