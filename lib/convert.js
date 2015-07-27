'use strict';

var Papa = require('papaparse');
var _ = require('lodash');
var moment = require('moment');

var papaparseConfig = {
  header: true,
  skipEmptyLines: true
};

module.exports = function convertMite2Toggl(options, callback) {
  var configError = checkConfigErrors(options.config);
  if (configError) {
    return callback(configError);
  }

  papaparseConfig.error = function(error) {
    return callback('CSV could not be parsed: ', error);
  };

  papaparseConfig.complete = function(parsedCsv) {
    var converted = parsedCsv.data
                      .map(addFixedColumns.bind(null, options.config))
                      .map(addColumnsWithRules.bind(null, options.config))
                      .map(addStartDate.bind(null, options.config))
                      .map(addDuration.bind(null, options.config))
                      .map(pickTogglColumns);

    return callback(null, Papa.unparse(converted));
  };

  Papa.parse(options.sourceCsv, papaparseConfig);
};

function checkConfigErrors(config) {
  if (!config.email) {
    return 'Missing required config field: email';
  } else if (!config.fields || !config.fields['Start date'] || !config.fields['Start date'].column) {
    return 'Missing required config field: dateColumn';
  } else if (!config.startTime) {
    return 'Missing required config field: startTime';
  }
  return false;
}

function miteDurationParser(row) {
  var momentDuration = moment.duration(parseFloat(row['Hours'], 10), 'hours');
  var hours = momentDuration.hours();
  var minutes = momentDuration.minutes();
  var seconds = momentDuration.seconds();
  return formatAsTwoDigitString(hours) + ':' +
         formatAsTwoDigitString(minutes) + ':' +
         formatAsTwoDigitString(seconds);
}

function formatAsTwoDigitString(number) {
  var numberString = number.toString();
  if (numberString.length < 2) {
    numberString = '0' + numberString;
  }
  return numberString;
}

function addDuration(config, row) {
  var durationParser = config.durationParser || miteDurationParser;
  row['Duration'] = durationParser(row);
  return row;
}

function addStartDate(config, row) {
  var startDate = row[config.fields['Start date'].column];
  var sourceFormat = config.fields['Start date'].dateFormat;
  if (sourceFormat) {
    startDate = moment(startDate, sourceFormat).format('YYYY-MM-DD'); // convert to toggl format
  }
  row['Start date'] = startDate;
  return row;
}

function addFixedColumns(config, row) {
  row['Email'] = config.email;
  row['Start time'] = config.startTime;
  row['Billable'] = 'Y';
  return row;
}

function pickTogglColumns(row) {
  return _.pick(row, togglCsvColumns);
}

function addColumnsWithRules(config, row) {
  var newRow = _.clone(row, true);

  ['Project', 'Client', 'Task', 'Tags', 'Description'].forEach(function(column) {
    newRow[column] = null;

    if (config.fields && config.fields[column]) {
      if (config.fields[column].column) { // Use an specified column from source CSV
        newRow[column] = row[config.fields[column].column];
      } else if (config.fields[column].rules) { // or a set of rules for taking data from other columns
        var projectColumnRules = config.fields[column].rules;

        projectColumnRules.forEach(function(rule){
          if (conditionsAreTrue(rule, row)) {
            newRow[column] = rule.value;
          }
        });
      }
    }
  });

  return newRow;
}

function conditionsAreTrue(rule, row) {
  return rule.conditions.every(validates.bind(null, row));
}

function validates(row, condition) {
  return row[condition.origColumn] === condition.value;
}

// If the order changes, tests might fail
var togglCsvColumns = [
  'Email',
  'Client',
  'Project',
  'Task',
  'Description',
  'Tags',
  'Start date',
  'Start time',
  'Duration',
  'Billable'
];
