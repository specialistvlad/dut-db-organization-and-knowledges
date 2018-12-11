const { Client } = require('pg');
const { db: config } = require('../config');

let client;

const connect = async () => {
  client = new Client(config);

  if (!client) {
    throw new Error('Can\'n instantiate pg client!');
  }

  await client.connect();
  console.log('Connection to DB successfull!');
  return client;
};

const query = async (...params) => (client || await connect()).query(...params);

module.exports = {
  query,
  getClient: () => client,
};
