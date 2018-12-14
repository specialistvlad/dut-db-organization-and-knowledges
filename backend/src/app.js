const express = require('express');
const cors = require('cors');
const { query } = require('./db');

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.get('/catalog', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select *, costs::numeric::float8
    from catalog
    where
      model ilike $1 OR
      manufactorer ilike $1 OR
      level ilike $1 OR
      info ilike $1
    ;`,
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.get('/manufactorers', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: 'select * from manufactorers where name ilike $1;',
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.get('/ports', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select * from ports where name ilike $1;`,
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.get('/levels', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select * from levels where name ilike $1;`,
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
