const server = require('./server.js')
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const mongodbURI = 'mongodb+srv://quizproquo:Gebru12@quizproquo.fmurj.mongodb.net/QuizDB?retryWrites=true&w=majority'

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('Connected to DB');
        server.listen(port, () => console.log(`\nServer listening on port http://localhost:${port}\n`));
    })
