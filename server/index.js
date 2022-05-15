// const server = require('./server.js')
// const mongoose = require('mongoose');
// const port = process.env.PORT || 3001;
// const mongodbURI = 'mongodb+srv://quizproquo:Gebru12@quizproquo.fmurj.mongodb.net/QuizDB?retryWrites=true&w=majority'

// mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(res => {
//         console.log('Connected to DB');
//         server.listen(port, () => console.log(`\nServer listening on port http://localhost:${port}\n`));
//     })

const app = require('./server')
const port = process.env.PORT || 3000;
// const init = require("./db/mongoInit.js");

app.listen(port, () => console.log(`Express now departing from port ${port}!`))

// server.listen(PORT, () => {
//     console.log(`Listening on port ${PORT} http://localhost:${PORT}`)
// })

// init();
