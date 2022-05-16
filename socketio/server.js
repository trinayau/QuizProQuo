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

const games = new Games();
io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
      users.push({
          userID: id,
          username: socket.username
      });
  };
  const participantCount = io.engine.clientsCount;

    console.log(participantCount)
    // socket.emit("users", participantCount);
    socket.emit("users", participantCount);

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

});

module.exports = server;
