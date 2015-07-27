# universal-togglr

Time tracking CSV converter: universal to Toggl

## Setup

```
git clone git@github.com:patriciagarcia/universal-togglr.git
cd universal-togglr
npm install
```

## Config

Add a `config.js` file inside `config` folder to set up your configuration. The file `config/example.config` contains the minimum required fields.

### Config fields

- `email` (required): contains the email associated with your Toggl account.
- `startTime` (required): `Start time` is a required field for Toggl import, but it's not required for our purposes (since we're entering just the duration of the entry) so you can just provide `00:00:00` here.
- `durationParser` (optional): if your tracking tool is not Mite you can provide here a parsing fuction that will be called with the `row` as argument and should return the entry duration in the format `hours:minutes:seconds`. You can see the Mite parsing function [here](https://github.com/patriciagarcia/universal-togglr/blob/master/lib/convert.js#L32).
- `fields`: is an object containing information to transform source CSV columns into Toggl CSV columns, for the following fields:
  - `Start date`: provide here the column in the source file containing start date (required) and optionally the source file start date format, if it's other than `YYYY-MM-DD` (use a [momentjs](http://momentjs.com/) compatible format).
     ```
     fields: {
       'Start date': {
         column: 'Date',
         dateFormat: 'YYYY-DD-MM'
       }
     }
     ```

  - `Description`, `Project`, `Client`, `Task`, `Tags`: there are two ways of providing the information to fill these fields. You can specify a source `column` and optionally a `translations` object to directly translate one source column into a Toggl column, and/or you can specify a set of rules to translate different columns into a single Toggl column.

    Example:
    ```
    fields: {
      'Tags': {
        column: 'Service',
        translations: {
          'po': 'product mgmt',
          'client support': 'support'
        },
        rules: {
          value: 'meeting',
          conditions: [{
            origColumn: 'Note',
            value: 'Stand up'
          }]
        }
      }
    }
    ```

    The translation works in the following way:
    1. If a `column` is provided but there is no `translations` field, the source column will be directly copied to the Toggl column. Be careful! This can cause new projects, clients, tasks or tags to be created! (and we have enough of those as it is ;)).
    2. If both a `column` and a `translations` field are provided, the script will translate (via `translations` object) the source column into the Toggl column, if no translation is found, the field will be left empty.
    3. If a `rules` field is provided, the script will try to match a source column given a conditions array into a Toggl column. For example in the example above if the `Note` column in the source have the value `Stand Up` the `Tags` column will be set to `meeting`. You can provide several `conditions`, if more than one condition is provided ALL of them should evaluate to `true` for the rule to be used.

    The script will try to fill the destination column following the three steps mentioned before, if none of them works, the destination column will be left empty.

## Usage

```
./bin/convert --source=source-csv-file.csv
```

This will create a `toggld-source-csv-file.csv` file.

## Tests

`npm test`
