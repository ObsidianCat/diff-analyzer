const config = require('./config');
const mongoose = require('mongoose');

const log = require('../helpers/log');

mongoose.Promise = Promise;

const dbHost = config.database.data.host;
const dbPort = config.database.data.port;
const dbName = config.database.data.db;

// const dbHost = 'localhost';
// const dbPort =
// const dbName =
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const reconnectTimeout = config.database.data.reconnectTimeout;

function connect() {
  mongoose.connect(dbURI, { auto_reconnect: true })
    .catch(() => {});
}

module.exports = () => {
  const db = mongoose.connection;

  db.on('connecting', () => {
    log.dev('Connecting to MongoDB...');
  });

  db.on('error', (err) => {
    log.error(`MongoDB connection error: ${err}`);
    mongoose.disconnect();
  });

  db.on('connected', () => {
    log.dev('Connected to MongoDB!');
  });

  db.once('open', () => {
    log.dev('MongoDB connection opened!');
  });

  db.on('reconnected', () => {
    log.dev('MongoDB reconnected!');
  });

  db.on('disconnected', () => {
    log.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
    setTimeout(() => connect(), reconnectTimeout);
  });

  connect();
};