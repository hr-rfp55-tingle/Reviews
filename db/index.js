const config = require('../config.js');
const { Pool } = require('pg');

const db = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});


db.connect()
.then( () =>  console.log(`Connected to database ${config.database}`))
.catch( (err) => console.log('Error connecting to db: ', err));

module.exports = db;