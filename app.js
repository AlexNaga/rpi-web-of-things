const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

app.use(logger('dev')); // Logs all requests to the terminal
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));

// Error handling
app.use((req, res, next) => {
  const err = new Error('The resource could not be found.');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;