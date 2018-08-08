const express = require('express');
const morgan  = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log('connected to server');
});
