db = connect('mongodb+srv://quizproquo:Gebru12@quizproquo.fmurj.mongodb.net/QuizDB?retryWrites=true&w=majority');
//Need to confirm the endpoint here from the Yaml files

db.scoreBoard.drop(); //drop table if exists

//sample data here
db.scoreBoard.insertMany([
    {
        gameId: 'test-room',
        username: 'billy',
        score: 13,
    },

    {
        gameId: 'meep',
        username: 'ooga',
        score: 25,
    },

    {
        gameId: 'hi',
        username: 'there',
        score: 2,
    },

])
