const express = require('express');
const cors = require('cors');
const { query } = require('./db');

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.get('/book', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select * from book where
      code ilike $1 OR
      author ilike $1 OR
      name ilike $1 OR
      publisher ilike $1 OR
      topic ilike $1
    ;`,
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.get('/reader', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select * from reader where
      last_name ilike $1 OR
      first_name ilike $1 OR
      middle_name ilike $1 OR
      address ilike $1 OR
      home_phone ilike $1 OR
      work_phone ilike $1
    ;`,
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.use('*', (req, res) => res.status(404).json({ description: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
