'use strict';

var fs = require('fs');
var Papa = require('papaparse');
var convert = require('./lib/convert');

var papaparseConfig = {
  header: true,
  skipEmptyLines: true
};

module.exports = function convertMite2Toggl(options, callback) {
  if (!options.source) {
    return callback('Please specify a source file with --source=path/to/file/filename.csv');
  }

  return fs.readFile(__dirname + '/' + options.source, 'utf8', function (error, csv) {
    if (error) {
      return callback('couldn\'t read the file. Error: ' + error);
    }

    console.log('- file read');

    options.sourceCsv = csv;

    convert(options, function(error, convertedCsv) {
      if (error) {
        return callback(error);
      }

      console.log('- source CSV converted');

      fs.writeFile('toggld-' + options.source, convertedCsv, function (error) {
        if (error) {
          return callback('couldn\'t write the file. Error: ' + error);
        }

        console.log('- Saved converted CSV to file');

        return callback();
      });
    });
  });
};
