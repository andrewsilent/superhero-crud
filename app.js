const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use('/api', router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    errors: [{ message: err.message || 'Serber error ' }],
  });
});

module.exports = app;
