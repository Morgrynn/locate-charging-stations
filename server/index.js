const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// var Strategy = require('passport-http').BasicStrategy;

const userComponent = require('./components/users');
// const apiKeyTest = require('./components/apiKeyTest');
// const routesComponent = require('./routes/user');

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// api for charging stations
// https://api.openchargemap.io/v3/poi/?output=json&countrycode=FI&maxresults=10

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* basic HTTP method handling */
app.get('/hello', (req, res) => res.send('Hello GET World!'));
app.post('/hello', (req, res) => res.send('Hello POST World!'));
app.put('/hello', (req, res) => res.send('Hello PUT World!'));
app.delete('/hello', (req, res) => res.send('Hello DELETE World!'));

/* Route parameters */
app.get('/hello/:parameter1/world/:parameter2', (req, res) => {
  res.send('Your route parameters are\n' + JSON.stringify(req.params));
});

/* Example of defining routes with different method handlers */
app
  .route('/world')
  .get((req, res) => res.send('get World'))
  .post((req, res) => res.send('post World'))
  .put((req, res) => res.send('put World'))
  .delete((req, res) => res.send('delete World'));

/* demonstrate route module/component usage - the dogComponent content is defined in separate file */
app.use('/users', userComponent);

// app.use('/apiKey', apiKeyTest);

// Routes
// app.use('/user', routesComponent);

/* DB init */
Promise.all([
  db.query(`CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(32),
    password VARCHAR(256), 
    email VARCHAR(256)
)`),
  // Add more table create statements if you need more tables
])
  .then(() => {
    console.log('database initialized');
    app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
      console.log('Available API endpoints');
      console.log('  /hello [GET, POST, PUT, DELETE]');
      console.log('  /hello/{param1}/world/{param2} [GET]');
      console.log('  /world [GET, POST, PUT, DELETE]');
      console.log('\n   /users [GET, POST]');
      console.log('\n   /users/unprotected-users [GET]');
      console.log('\n   /users/protected-users [GET]');
      console.log('\n   /users/login [POST]');
      console.log('\n   /users/register [POST]');
      console.log('\n  /apikey/new/{username} [GET]');
      console.log('  /apikey/protected} [GET]');
      console.log(
        '\n\n Use for example curl or Postman tools to send HTTP requests to the endpoints'
      );
    });
  })
  .catch((error) => console.log(error));
