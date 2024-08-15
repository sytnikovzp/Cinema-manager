const path = require('path');
const fs = require('fs');
// ======================================================
const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');
const chokidar = require('chokidar');
// ======================================================

const dbPath = path.resolve('db.json');

if (!fs.existsSync(dbPath)) {
  console.error('Database file not found:', dbPath);
  process.exit(1);
}

const {
  reverse: { reverseOrder },
} = require('./middleware');

const {
  time: { getTime, showTime },
} = require('./middleware');

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

const watcher = chokidar.watch(dbPath);
watcher.on('change', () => {
  console.log('db.json has been updated. Reloading data...');
  const newData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  router.db.setState(newData);
});

const app = express();

app.use(cors());
app.use(middlewares);
app.use(reverseOrder);
app.use(getTime, showTime);
app.use('/api', router);

module.exports = app;
