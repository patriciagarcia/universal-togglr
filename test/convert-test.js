var fs = require('fs');
var assert = require('assert');
var convert = require('../lib/convert');
var config = require('../config/example-config');
var moment = require('moment');

describe('convert', function() {
  describe('from mite to toggl', function() {
    it('converts the CSV string correctly', function() {

      var sourceCsv = fs.readFileSync(__dirname + '/fixtures/mite-time-entries.csv', 'utf8');
      var toggldCsv = fs.readFileSync(__dirname + '/fixtures/toggld-mite-time-entries.csv', 'utf8');

      var options = {
        sourceCsv: sourceCsv,
        config: config
      };

      convert(options, function(error, convertedCsv) {
        if (error) {
          throws(error);
        }

        assert.equal(error, null);
        assert.equal(convertedCsv, toggldCsv);
      });
    });
  });
});
