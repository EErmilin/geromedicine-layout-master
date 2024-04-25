'use strict';

const gulp  	= require('gulp');
const del  	    = require('del');
const config    = require('../config.js')


module.exports = () => {

	return del(config.dist.dist)

};