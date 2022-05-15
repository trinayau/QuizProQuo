const Game = require("../models/Game");

async function home(req, res) {
    try {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    } catch (e) {
      res.status(500).send({ e: "Cannot load the highscores" });
    }
  }
  

async function setGame(req, res) {
    try {
      const { categoryId, difficulty, range } = req.params;
      const newgame = await Game.create(categoryId, difficulty, range);
      res.status(200).json(newgame);
    } catch (e) {
      res.status(500).send({ e: "Cannot start the game!" });
    }
  }

module.exports = { home, setGame }
