const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportHttp = require('passport-http');

// Middleware function to check username and password given against ones stored in database
passport.use(
  new passportHttp.BasicStrategy(function (username, password, done) {
    db.query('SELECT id, username, password FROM users WHERE username = ?', [
      username,
    ])
      .then((dbResults) => {
        console.log('dbResults: ', dbResults);
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
      .catch((dbError) => done(err));
  })
);

// GET all unprotected user information from /users/unprotected-users
// router.get('/unprotected-users', (req, res) => {
//   console.log('Successful GET FROM: /users/unprotected-users ');
//   res.send('Hello There! You are not logged in.');
// });

// Get all protected users information from /users/protected-users
// passport middleware gets passed to protected data
// router.get(
//   '/protected-users',
//   passport.authenticate('basic', { session: false }),
//   (req, res) => {
//     console.log('Successful GET FROM: /users/protected-users ');
//     db.query('SELECT * FROM users')
//       .then((results) => {
//         res.json({ users: results });
//       })
//       .catch(() => {
//         res.sendStatus(500);
//       });
//   }
// );

const saltRounds = 10;
// POST -  register users to database to /users/register
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
              console.log('dbResults: ', dbResults);
              res.sendStatus(201);
            })
            .catch((error) => res.sendStatus(500));
        }
        if (results.length > 0) res.send('Username OR Email Already Exists');
        if (err) throw err;
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
    console.log(req.user);
    // res.send('Successful authenticated');
    // res.json({ users: req.user });
    res.sendStatus(200);
  }
);

module.exports = router;
