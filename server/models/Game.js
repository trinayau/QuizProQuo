const Schema = require('./Schema');
module.exports = class Game {
    constructor() { }

    static setGame(data, categoryId, difficulty, range) {
        return new Promise(async (resolve, reject) => {
          try {
            const questions = await axios.get(
              `https://opentdb.com/api.php?amount=${range}&category=${categoryId}&difficulty=${difficulty}`
            );
            const questionList = await questions.data;
            const resCode = await questions.data.response_code;
    
            // The response code is 0 if there are questions in a list. 1 indicates an error such as no questions
            if (resCode > 0) {
              throw new Error(
                "Questions in this search query has not been found :("
              );
            }
            const gameParams = {
                gameId: data.gameId
            }
            const newGame = await new Schema.Game(gameParams);
            resolve(newGame)
              .insertOne({ questions: questionList });
    
            resolve(newGame.insertedId);
          } catch (err) {
            reject(`Cannot set a game: ${err.message}`);
          }
        });
      }



}
