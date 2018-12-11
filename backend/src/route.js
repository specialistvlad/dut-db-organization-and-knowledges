const r = require('express').Router();

// r.use('/example', require('./example'));
r.use('/session', require('./session'));

r.use('/a', (req, res) => {
  res.send('aaaa');
});
// system routes
if (process.env.DEPLOY_VERSION) {
  r.use('/version', (req, res) => {
    res.send(process.env.DEPLOY_VERSION);
  });
}

module.exports = r;
