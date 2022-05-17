const express = require('express');
const app = express();
const http = require("http");
const {Server} = require('socket.io');
const cors = require("cors")
app.use(cors());
const server = http.createServer();

const {Games} = require('./Game') 

const io = new Server(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
})

//Makes new instance of Games
const games = new Games();

//Initialises connected users array
let users = [];

//Connected socket
io.on("connection", (socket) => {

//Declares user object
socket.on("join server", (username) => {
  const user = {
    username,
    id: socket.id
  }
  //Pushes connected user to users array and emits the users array
  users.push(user);
  console.log(users)
  io.emit("new user", users);
});


//Emits number of people online
  let participantCount = io.engine.clientsCount;
  console.log(participantCount)
  io.emit("users", participantCount);

  //Checks if there is room in games array
    socket.on("check-room", (roomName, callback) => {
      console.log("CLIENT REQUEST TO CREATE ROOM WITH " ,  roomName)
      if (games.checkRoomName(roomName)) {
          callback({code: "success",
                  message: `SUCCESS: Created room with name ${roomName}`
              }); 
      } else {
          callback({code: "ERROR",
                    message: `Room name ${roomName} is taken. Please try another name.`
                  })
      }
  });


//On disconnect, count new number of clients and update participantCount
  socket.on('disconnect', () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("new user", users);
    //makes io count the number of clients again
    participantCount = io.engine.clientsCount;
    io.emit("users", participantCount);
    console.log(participantCount)
})

});

module.exports = server;
