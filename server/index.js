const express = require('express');
const axios = require('axios');
const path = require('path');
const config = require('../config.js');
const { Pool } = require('pg');
const db = require('../db');
const reviews = require('./reviews');

const PORT = 3002;
const app = express();

app.use('/reviews', reviews);


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
