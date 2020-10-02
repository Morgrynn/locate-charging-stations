const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportHttp = require('passport-http');

const saltRounds = 10;

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
router.get('/unprotected-users', (req, res) => {
  console.log('Successful GET FROM: /users/unprotected-users ');
  db.query('SELECT * FROM users')
    .then((results) => {
      res.json({ users: results });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

// POST an unprotected user information to /users/register
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
    bcrypt
      .hash(password, saltRounds)
      .then((hash) =>
        db.query(
          'INSERT INTO users (username, password, email) VALUES (?,?,?)',
          [username, hash, email]
        )
      )
      .then((dbResults) => {
        console.log(dbResults);
        res.sendStatus(201);
      })
      .catch((error) => res.sendStatus(500));
  } else {
    console.log(
      'incorrect username or password or email, both must be strings and username more than 4 long and password more than 6 characters long'
    );
    res.sendStatus(400);
  }
});

// POST an unprotected user information to /users/register
// router.post('/register', (req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;
//   let email = req.body.email;
//   const passwordHash = bcrypt.hashSync(password, 8);
//   // console.log(username, passwordHash);
//   db.query('INSERT INTO users (username, password, email) VALUES (?,?,?)', [
//     username,
//     passwordHash,
//     email,
//   ])
//     .then((results) => {
//       // res.json(results);
//       console.log(results);
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });

//  Return information of a single user
// router.get('/:userId', (req, res) => {
//   db.query('SELECT * FROM userList where id = ?', [req.params.userId])
//     .then((results) => {
//       res.json(results);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });

// Register information to users table in usersdb
// router.post('/login', (req, res) => {
//   const passwordHash = bcrypt.hashSync(req.body.password, 10);
//   db.query('INSERT INTO userList (name, password) VALUES (?,?)', [
//     req.body.name,
//     req.body.email,
//     passwordHash,
//   ])
//     .then((results) => {
//       console.log(results);
//       res.sendStatus(200);
//     })
//     .catch(() => {
//       res.sendStatus(500);
//     });
// });

// Register information to users table in usersdb
// router.post('/register', (req, res) => {
//   const passwordHash = bcrypt.hashSync(req.body.password, 10);
//   db.query('INSERT INTO userList (name, password) VALUES (?,?)', [
//     req.body.name,
//     req.body.email,
//     passwordHash,
//   ])
//     .then((results) => {
//       console.log(results);
//       res.sendStatus(200);
//     })
//     .catch(() => {
//       res.sendStatus(500);
//     });
// });

module.exports = router;
