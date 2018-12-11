const { env, api } = require('../config');
const app = require('./app');
const { getClient } = require('./db');

const server = app.listen(api.port, () => {
  console.log(`NodeJS app running at:
    mode: ${(env.node_env).toUpperCase()}
    host: ${server.address().address}:${api.port}})
    time: ${new Date()}`);
});

const terminateHandler = (name, e) => {
  console.error(`Received ${name}, closing server...`, '\n', e);
  const dbClient = getClient();
  Promise.all([(dbClient && dbClient.end ? dbClient.end() : true), server.close()])
    .then(() => {
      console.log(`Server closed upon ${name}, exiting...`);
      process.exit(1);
    })
    .catch((err) => {
      console.error('Can\'t gracefully close the server.', '\n', err);
      process.exit(1);
    });
};

process.on('SIGTERM', terminateHandler.bind(null, 'SIGTERM'));
process.on('SIGINT', terminateHandler.bind(null, 'SIGINT'));
process.on('uncaughtException', terminateHandler.bind(null, 'uncaughtException'));
process.on('unhandledRejection', terminateHandler.bind(null, 'unhandledRejection'));
