// db = connect('mongodb+srv://quizproquo:Gebru12@quizproquo.fmurj.mongodb.net/QuizDB?retryWrites=true&w=majority');
//Need to confirm the endpoint here from the Yaml files

db.scoreBoard.drop(); //drop table if exists

//sample data here
db.scoreBoard.insertMany([
    {
        username: 'Mimi',
        score: "13",
    },

    {
        username: 'Peritract',
        score: "25",
    },

    {
        username: 'Fifi',
        score: "2",
    },

])
