const express = require('express');
const path = require('path');
const reviews = require('./reviews');

const PORT = 3002;
const app = express();

app.use('/reviews', reviews);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
