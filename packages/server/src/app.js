const path = require('path');
// ============================
const express = require('express');
const cors = require('cors');
// ============================
const {
  errorHandlers: { validationErrorHandler, errorHandler },
} = require('./middleware');

const {
  time: { getTime, showTime },
} = require('./middleware');
// ============================
const router = require('./routers');

const app = express();

app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);

app.use(express.json());

app.use(express.static(path.resolve('public')));

app.use(getTime, showTime);

// ============================
//  Cinema manager APP
// ============================

app.use('/api', router);
app.use(validationErrorHandler, errorHandler);

module.exports = app;
