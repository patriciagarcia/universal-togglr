'use strict';

var Papa = require('papaparse');
var _ = require('lodash');
var moment = require('moment');

var papaparseConfig = {
  header: true,
  skipEmptyLines: true
};

module.exports = function convertMite2Toggl(options, callback) {
  papaparseConfig.error = function(error) {
    return callback('CSV could not be parsed: ', error);
  };

  papaparseConfig.complete = function(parsedCsv) {
    var converted = parsedCsv.data
                      .map(addFixedFields.bind(null, options.config))
                      .map(addFieldsWithRules.bind(null, options.config))
                      .map(addDescription.bind(null, options.config))
                      .map(addStartDate.bind(null, options.config))
                      .map(addDuration.bind(null, options.config))
                      .map(pickTogglFields);

    return callback(null, Papa.unparse(converted));
  };

  Papa.parse(options.sourceCsv, papaparseConfig);
};

function miteDurationParser(duration) {
  var momentDuration = moment.duration(parseFloat(duration, 10), 'hours');
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
  row['Duration'] = durationParser(row[config.durationField]);
  return row;
}

function addStartDate(config, row) {
  var startDate = row[config.dateField];
  if (config.dateFormat) {
    startDate = moment(startDate, config.dateFormat).format('YYYY-MM-DD'); // convert to toggl format
  }
  row['Start date'] = startDate;
  return row;
}

function addFixedFields(config, row) {
  row['Email'] = config.email;
  row['Start time'] = config.startTime;
  row['Billable'] = 'Y';
  return row;
}

function pickTogglFields(row) {
  return _.pick(row, togglCsvColumns);
}

function addFieldsWithRules(config, row) {
  var newRow = _.clone(row, true);

  ['Project', 'Client', 'Task', 'Tags'].forEach(function(column) {
    newRow[column] = null;

    var projectColumnRules = config.columns[column];

    projectColumnRules.forEach(function(rule){
      if (conditionsAreTrue(rule, row)) {
        newRow[column] = rule.value;
      }
    });
  });

  return newRow;
}

function addDescription(config, row) {
  row['Description'] = null;
  if (config.descriptionField) {
    row['Description'] = row[config.descriptionField];
  }
  return row;
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
