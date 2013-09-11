/*
 * grunt-wtbuild
 * https://github.com/aloysious/grunt-wtbuild
 *
 * Copyright (c) 2013 aloysious
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
	fs = require('fs');

function toAscii(str, identifier) {
	return str.replace(/[\u0080-\uffff]/g, function(ch) {
		var code = ch.charCodeAt(0).toString(16);
		if (code.length <= 2 && !identifier) {
			while (code.length < 2) code = "0" + code;
			return "\\x" + code;
		} else {
			while (code.length < 4) code = "0" + code;
			return "\\u" + code;
		}
	});
}

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
  	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('toascii', 'Your task description goes here.', function() {
  		// Merge task-specific and/or target-specific options with these defaults.
    	var options = this.options();

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
		
			f.src.forEach(function(src){
				var inputSrc = path.resolve(src),
					outputSrc = path.resolve(String(f.dest)),
					outputFile = path.resolve(outputSrc),
					content = grunt.file.read(inputSrc).toString(),
					outputContent = '';

				outputContent = toAscii(content);
				grunt.file.write(outputFile, outputContent);
				grunt.log.writeln('File "' + outputFile + '" created.');
			});
		});
  	});
};
