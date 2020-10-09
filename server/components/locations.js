const express = require('express');
const router = express.Router();
const data = require('../chargemap.json');
const datatwo = require('../chargemaptwo.json');

router.get('/locations', (req, res) => {
  res.json(data.locations);
});

router.get('/more-locations', (req, res) => {
  res.json(datatwo.locations);
});

router.get('/locations/:id', (req, res) => {
  const id = req.params.id;
  const place = data.locations.find((location) => location.id === id);
  if (place) {
    res.json(place.Geometery);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
