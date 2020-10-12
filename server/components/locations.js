const express = require('express');
const router = express.Router();
const data = require('../chargemap.json');
const datatwo = require('../chargemaptwo.json');

router.get('/station1', (req, res) => {
  res.json(data.locations);
});

router.get('/station2', (req, res) => {
  res.json(datatwo.locations);
});

router.get('/station1/:id', (req, res) => {
  const id = Number(req.params.id);
  const place = data.locations.find((location) => location.id === id);
  if (place) {
    res.json(place);
  } else {
    res.status(404).end();
  }
});

router.get('/station2/:id', (req, res) => {
  const id = Number(req.params.id);
  const place = datatwo.locations.find((location) => location.id === id);
  if (place) {
    res.json(place);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
