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
        assert.equal(error, null);
        assert.equal(convertedCsv, toggldCsv);
      });
    });
  });
  describe('Columns', function() {
    beforeEach(function() {
      config = {
        email: 'test@example.com',
        dateColumn: 'column2',
        startTime: '00:00:00',
        durationColumn: 'duration'
      };
    });
    describe('Project', function() {
      it('uses a column from the source CSV if specified in `config.projectColumn`', function() {
        config.projectColumn = 'proj';
        var sourceCsv = "proj,column2,duration\ntest,test2,1";
        var toggldCsv = "Email,Client,Project,Task,Description,Tags,Start date,Start time,Duration,Billable\r\ntest@example.com,,test,,,,test2,00:00:00,01:00:00,Y";

        var options = {
          sourceCsv: sourceCsv,
          config: config
        };

        convert(options, function(error, convertedCsv) {
          assert.equal(error, null);
          assert.equal(convertedCsv, toggldCsv);
        });
      });
    });
    describe('Client', function() {
      it('uses a column from the source CSV if specified in `config.clientColumn`', function() {
        config.clientColumn = 'client';
        var sourceCsv = "client,column2,duration\ntest,test2,1";
        var toggldCsv = "Email,Client,Project,Task,Description,Tags,Start date,Start time,Duration,Billable\r\ntest@example.com,test,,,,,test2,00:00:00,01:00:00,Y";

        var options = {
          sourceCsv: sourceCsv,
          config: config
        };

        convert(options, function(error, convertedCsv) {
          assert.equal(error, null);
          assert.equal(convertedCsv, toggldCsv);
        });
      });
    });
    describe('Task', function() {
      it('uses a column from the source CSV if specified in `config.taskColumn`', function() {
        config.taskColumn = 'task';
        var sourceCsv = "task,column2,duration\ntest,test2,1";
        var toggldCsv = "Email,Client,Project,Task,Description,Tags,Start date,Start time,Duration,Billable\r\ntest@example.com,,,test,,,test2,00:00:00,01:00:00,Y";

        var options = {
          sourceCsv: sourceCsv,
          config: config
        };

        convert(options, function(error, convertedCsv) {
          assert.equal(error, null);
          assert.equal(convertedCsv, toggldCsv);
        });
      });
    });
    describe('Tags', function() {
      it('uses a column from the source CSV if specified in `config.tagsColumn`', function() {
        config.tagsColumn = 'tags';
        var sourceCsv = "tags,column2,duration\ntest,test2,1";
        var toggldCsv = "Email,Client,Project,Task,Description,Tags,Start date,Start time,Duration,Billable\r\ntest@example.com,,,,,test,test2,00:00:00,01:00:00,Y";

        var options = {
          sourceCsv: sourceCsv,
          config: config
        };

        convert(options, function(error, convertedCsv) {
          assert.equal(error, null);
          assert.equal(convertedCsv, toggldCsv);
        });
      });
    });
  });
});
