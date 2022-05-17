const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.js')
const scoreController = require('../controllers/scoreboard.js')
router.route('/')
    .get (gameController.home)

router.post('/game/:categoryId/:difficulty/:range', gameController.setGame)

//Possible routes for the leaderboard or scores display
router.get('/', scoreController.index)
router.get('/:id', scoreController.show)
router.post('/', scoreController.create);


module.exports = router;
