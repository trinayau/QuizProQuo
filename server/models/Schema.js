const axios = require("axios");
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    lowercase: true
  },

  //Data type changed from integer to string as it's being presented as a %
  score: {
    type: String,
    min: [0, 'Minimum score is 0'],
    default: 0
  }
});

const Game = mongoose.model('game', gameSchema);

module.exports = { Game };
