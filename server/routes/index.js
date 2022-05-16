const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.js')

router.route('/')
    .get (gameController.home)

router.post('/game/:categoryId/:difficulty/:range', gameController.setGame)

module.exports = router;
