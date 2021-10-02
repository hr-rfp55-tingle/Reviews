const express = require('express');
const axios = require('axios');
const path = require('path');
const config = require('../config.js');
const { Pool } = require('pg');

const PORT = 3002;
const app = express();
const router = express.Router();
app.use(express.json());

const db = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect()
  .then( () =>  console.log(`Connected to database ${config.database}`))
  .catch( (err) => console.log('Error connecting to db: ', err));

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
