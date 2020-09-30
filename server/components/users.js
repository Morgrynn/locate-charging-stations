const express = require('express');
const db = require('../db');
const router = express.Router();

// Return all user information
router.get('/', (req, res) => {
  db.query('SELECT * FROM userList')
    .then((results) => {
      res.json({ users: results });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

//  Return information of a single user
router.get('/:userId', (req, res) => {
  db.query('SELECT * FROM userList where id = ?', [req.params.userId])
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// Post information to users
router.post('/', (req, res) => {
  db.query('INSERT INTO userList (name, password) VALUES (?,?)', [
    req.body.name,
    req.body.password,
  ])
    .then((results) => {
      console.log(results);
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = router;
