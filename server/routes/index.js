const express = require('express');
const gameController = require('../controllers/game.js')
const scoreController = require('../controllers/scoreboard.js')

const gameRouter = express.Router();
const scoreRouter = express.Router();


gameRouter.route('/').get(gameController.home)
gameRouter.post('/game/:categoryId/:difficulty/:range', gameController.setGame)

//Possible routes for the leaderboard or scores display
scoreRouter.get('/', scoreController.index)
scoreRouter.get('/:id', scoreController.show)
scoreRouter.post('/', scoreController.create);


module.exports = { gameRouter, scoreRouter }