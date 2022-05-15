const express = require('express')
const app = express();
const path = require('path')
const gameRoute = require('./routes/index.js')
const cors = require('cors');
app.use(cors())
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'build')));

// Root route
app.get('/', (req, res) => res.send("Hello, world! Welcome to QuizProQuo\'s API!"));

// app.use('/', gameRoute)

// app.use('/users', (req,res)=> {
//     res.send("Hello welcome to Quiz Pro Quo!");
// })

// If a route is incorrect, redirect to /
// app.get("*", (req, res) => {
//     res.redirect("/")
// })

module.exports = app;
