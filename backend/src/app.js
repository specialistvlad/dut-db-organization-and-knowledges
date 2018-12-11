const express = require('express');

const app = express();

app.get('/', async (req, res) => {
  console.log('Запрос от клиента👍');
  res.send('Ответ от сервера: 🤟🏽');
});

app.use('*', (req, res) => res.status(404).json({ description: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
