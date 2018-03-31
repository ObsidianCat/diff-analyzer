const config = require('config');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

const dbHost = config.get('database.data.host');
const dbPort = config.get('database.data.port');
const dbName = config.get('database.data.db');
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const reconnectTimeout = config.get('database.data.reconnectTimeout');

function connect() {
  mongoose.connect(dbURI, { auto_reconnect: true })
    .catch(() => {});
}

module.exports = () => {
  const db = mongoose.connection;


  db.on('error', (err) => {
    mongoose.disconnect();
  });

  db.on('disconnected', () => {
    setTimeout(() => connect(), reconnectTimeout);
  });

  connect();
};
