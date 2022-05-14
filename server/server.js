const express = require('express')
const app = express();
const path = require('path')

const cors = require('cors');
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/users', (req,res)=> {
    res.send("Hello welcome to Quiz Pro Quo!");
})

// If a route is incorrect, redirect to /
// app.get("*", (req, res) => {
//     res.redirect("/")
// })

module.exports = app;
