const express = require('express');
const app = express();
const http = require("http");
const {Server} = require('socket.io');
const cors = require("cors")
app.use(cors());
const server = http.createServer(app);

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
socket.on('game-start', (roomName) => {
  console.log("game started")
    io.to(roomName).emit('game-start', true)
});

socket.on('join-room', (config, cb) => {
  //check room
  console.log(config);
  let foundRoom = games.canRoomBeJoined(config.room);
  console.log('join-room', foundRoom)

  if(foundRoom == 'ERROR') {
    console.log('no room found')
    const errorMsg = 'Room does not exist'
    io.to(config.id).emit("no room", errorMsg)
  } else {
          console.log("adding player")
          games.addPlayer(config.username, config.room, socket.id);
          socket.join(config.room);
          socket.emit(`${config.username} has joined the room`);
          io.emit('new peon', config.username)
          let game = games.getGameByRoom(config.room);

          cb({
              code: "success",
              player: config.username, 
              score: 0 
          })

          io.to(game.host).emit("player-connected", { 
              name: config.username, 
              score: 0 
          });
        }
  }
)

//messages - chatroom
socket.on("message sent", ({ nicknameChosen, message, room }) => {
  io.emit("receive message", nicknameChosen, message);
  console.log('message received:', 'nickname:',nicknameChosen, 'message:',message, 'room:',room)
});

let gamePlayers; 
let roomNameVar; 
socket.on('game-players', (roomName, cb) => {
    const data = games.getPlayerData(roomName)
    gamePlayers = data
    roomNameVar = roomName
    io.in(roomName).emit(data);

    cb(
        data
    )

})


io.to(roomNameVar).emit('game-players');

    socket.on('game-start', (roomName) => {
        console.log("game started")
        io.to(roomName).emit('game-start', true)
    });
  
    socket.on('get-questions', (roomName, cb) => {
      const data = games.getGame(roomName)
      cb(data)
    })


//Sends scores
  socket.on('score',  (config, cb) => {
  console.log("SCORE TALLY")
  //get data
  let scores =  games.addScore(config.room, config.username, config.score);
  io.to(config.room).emit('score', scores);
  cb({
      code: "success",
      scores: scores
  })
  });

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
