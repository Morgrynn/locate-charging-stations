const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const userComponent = require('./components/users');
const locationComponent = require('./components/locations');
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userComponent);
app.use('/charger', locationComponent);

/* DB init */
Promise.all([
  db.query(`CREATE TABLE IF NOT EXISTS users(
    id_users INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(32),
    password VARCHAR(256), 
    email VARCHAR(256)
)`),
  db.query(`CREATE TABLE IF NOT EXISTS location(
    id_location INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(32),
    address VARCHAR(256),
    lengthChargeTime VARCHAR(256),
    chargeCost VARCHAR(256),
    chargeDate DATETIME,
    currentTime TIMESTAMP
)`),

  // Add more table create statements if you need more tables
])
  .then(() => {
    console.log('database initialized');
    app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
      console.log('Available API endpoints');
      console.log('\n   /users/login [POST]');
      console.log('\n   /users/register [POST]');
      console.log('\n   /users/history/:username [GET, POST]');
      console.log('\n   /users/history [POST]');
      console.log('\n   /charger/station1 [GET]');
      console.log('\n   /charger/station2 [GET]');
      console.log('\n   /charger/station1/:id [GET]');
      console.log('\n   /charger/station2/:id [GET]');
      console.log(
        '\n\n Use for example curl or Postman tools to send HTTP requests to the endpoints'
      );
    });
  })
  .catch((error) => console.log(error));
