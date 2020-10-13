const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportHttp = require('passport-http');

// Middleware function to check username and password given against ones stored in database
passport.use(
  new passportHttp.BasicStrategy(function (username, password, done) {
    db.query(
      'SELECT id_users, username, password FROM users WHERE username = ?',
      [username]
    )
      .then((dbResults) => {
        // console.log('dbResults: ', dbResults);
        if (dbResults.length == 0) {
          return done(null, false);
        }

        bcrypt.compare(password, dbResults[0].password).then((bcryptResult) => {
          if (bcryptResult == true) {
            done(null, dbResults[0]);
          } else {
            return done(null, false);
          }
        });
      })
      .catch((dbError) => done('dbError -> ', dbError));
  })
);

// Get all protected users information from /users/protected-users
// passport middleware gets passed to protected data
router.get(
  '/history/:username',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    db.query('SELECT * FROM location WHERE username = ?', [req.params.username])
      .then((results) => {
        res.json(results);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
);

// POST user data to history table
router.post('/history', (req, res) => {
  let username = req.body.username;
  let address = req.body.address;
  let chargetime = req.body.lengthChargeTime;
  let cost = req.body.chargeCost;

  db.query(
    'INSERT INTO location (username, address, lengthChargeTime, chargeCost, chargeDate, currentTime) VALUES (?,?,?,?, CURDATE(), CURTIME())',
    [username, address, chargetime, cost],
    function (err, dbresults, fields) {
      if (err) {
        res.send({ err: err });
      }
      console.log('location db ', dbresults);
      res.send({ dbresults });
      // res.sendStatus(201);
    }
  );
  // console.log('history req ', req.body);
  // res.send(req)
});

// POST -  register users to database to /users/register
const saltRounds = 10;
router.post('/register', (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let email = req.body.email.trim();

  if (
    typeof username === 'string' &&
    username.length > 4 &&
    typeof password === 'string' &&
    password.length > 6
  ) {
    db.query(
      'SELECT * FROM users WHERE (username = ? OR email = ?)',
      [username, email],
      function (err, results, fields) {
        if (err) {
          res.send({ err: err });
        }
        if (results.length == 0) {
          console.log('Username does not exist', username);
          bcrypt
            .hash(password, saltRounds)
            .then((hash) =>
              db.query(
                'INSERT INTO users (username, password, email) VALUES (?,?,?)',
                [username, hash, email]
              )
            )
            .then((dbResults) => {
              // console.log('dbResults: ', dbResults);
              res.sendStatus(201);
              // res.redirect('/login');
            })
            .catch((error) => res.sendStatus(500));
        }
        if (results.length > 0) res.send('Username OR Email Already Exists');
      }
    );
  } else {
    console.log(
      'incorrect username or password or email, both must be strings and username more than 4 long and password more than 6 characters long'
    );
    res.sendStatus(400);
  }
});

// POST - login with database username and password to /users/login
router.post(
  '/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    // res.send('Successful authenticated');
    // res.json();
    // res.sendStatus(200);
    res.send({ users: req.user });
  }
);

module.exports = router;
