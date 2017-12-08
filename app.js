const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const defaultConfig = require('./config/default');
const routes = require('./app/routes');
const helpers = require('./app/helpers');

const app = express();


// =============================================================================
//  INIT APP WITH CONFIG

console.log('defaultConfig\n', defaultConfig);

// CLI arguments to override config
// const argv = require('minimist')(process.argv.slice(2));
// console.log('Command line arguments', argv)

helpers.initServiceData(defaultConfig);


// =============================================================================
//  BODYPARSER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// =============================================================================
//  LOGGING

app.use(morgan('tiny'));


// =============================================================================
//  ROUTES

app.use('/api', routes);


// =============================================================================
//  ERROR HANDLER

app.use((err, req, res, next) => {
  // return error cleanly
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    });
})


// =============================================================================
//  LISTEN

app.listen(3000, () => {
  console.log('\n Taxi Booking App listening on port 3000');
});
