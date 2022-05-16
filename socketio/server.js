const express = require('express');
const app = express();
const http = require("http");
const {Server} = require('socket.io');
const cors = require("cors")
app.use(cors());
const server = http.createServer()

const io = new Server(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
})

const playerIdList = [];
const connectCounter = 0;

io.on("connection", (socket) => {
  socket.on('connect', function() { connectCounter++; });
  console.log(`Connection to the socket: ${socket.id} has been made`);
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
  socket.on("create", (roomId) => {
    socket.join(roomId);

    playerIdList.push({
      room: roomId,
      id: socket.id,
      username: socket.id,
      userReady: false,
      timer: false,
    });

    io.to(roomId).emit(
      "lobby-players",
      playerIdList.filter((game) => game.room === roomId)
    );

    socket.on("username", (nickname) => {
      playerIdList.find((s) => s.id === socket.id).username = nickname;
      io.in(roomId).emit(
        "lobby-players",
        playerIdList.filter((game) => game.room === roomId)
      );
    });

    socket.on("message", ({ nicknameChosen, message }) => {
      socket.broadcast.to(roomId).emit("receive-message", nicknameChosen, message);
    });

    //handle ready function
    socket.on("isReady", (socketId) => {
      io.to(roomId).emit("ready", socketId);
    });

    socket.on("disconnect", () => {
      const disconnect = playerIdList.findIndex(
        (game) => game.id === socket.id
      );
      playerIdList.splice(disconnect, 1);

      if (io.sockets.adapter.rooms.get(roomId)) {
        io.to(roomId).emit(
          "lobby-players",
          playerIdList.filter((game) => game.room === roomId)
        );
      }
    });

    // socket.on('timer', () => {
    //     const me = playerIdList.find(s => s.id === socket.id)
    //     me.timer = true
    //     const lobbyPlayers = playerIdList.filter(game => game.room === roomId)
    //     if(lobbyPlayers.every(s => s.timer===true)){

    //         let timer = 10;
    //         const countdown = setInterval(function () {
    //             io.to(roomId).emit('countdown', timer)
    //             timer--
    //             socket.on('reset', () => {
    //                 clearInterval(countdown)
    //                 lobbyPlayers.forEach(s => s.timer = false)
    //             })
    //             if (timer < 0) {
    //                 io.to(roomId).emit('timeUp')
    //                 clearInterval(countdown)
    //                 lobbyPlayers.forEach(s => s.timer = false)
    //             }
    //         }, 1000)
    //     }
    // })
  });
});

module.exports = server;
