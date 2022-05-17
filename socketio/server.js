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

socket.emit('assign-id', { id: socket.id});

socket.on("join server", (username) => {
  //Declares user object
  const user = {
    username,
    id: socket.id
  }
  //Pushes connected user to users array and emits the users array
  users.push(user);
  io.emit("new user", users);
});


//Emits number of people online
  let participantCount = io.engine.clientsCount;
  io.emit("users", participantCount);

  //Checks if there is room in games array, if not sends back a console.log success message to say room is created (but room isn't actually created until difficulty is chosen)
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

  //This actually creates the room
  socket.on('add-config', (config, cb) => {

    games.addGame(config.host, config.room, config.difficulty, config.count, config.subject );
    socket.join(config.host)

    games.addPlayer(config.username, config.room, config.host)

    cb({
        code: "success",
        message: `SUCCESS: configuration has been added`
    }); 
})

//On disconnect, count new number of clients and update participantCount
  socket.on('disconnect', () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("new user", users);
    //makes io count the number of clients again
    participantCount = io.engine.clientsCount;
    io.emit("users", participantCount);
})

});

module.exports = server;
