# universal-togglr

Time tracking CSV converter: universal to Toggl

## Setup

```
git clone git@github.com:patriciagarcia/universal-togglr.git
cd universal-togglr
npm install
```

Add your configuration to `config/config.js` (I'll add more information about the configuration file soon, in the meantime you can check `config/example-config.js` and the test files `test/fixtures` for inspiration).

**Note**: if you're not using Mite, you'll need to add your own function for parsing of the task duration to toggl format (see [Mite parser](https://github.com/patriciagarcia/universal-togglr/blob/master/lib/convert.js#L32))and pass it to the config as `config.durationParser`.

## Usage

```
./bin/convert --source=source-csv-file.csv
```

This will create a `toggld-source-csv-file.csv` file.

## Tests

`npm test`
