# QuizProQuo
 Lap 3 quiz website built with React, MongoDB, Express and Node.js
 Project team consists of:
 * [Andrew](https://github.com/akennedy205)
 * [Diren](https://github.com/Dnayir)
 * [Yusra](https://github.com/yusra-tahir)
 * [Trina](https://github.com/trinayau)

## Project Description
This is a Lap 3 group project to make a quiz using React.
Quiz-Pro-Quo is MERN fullstack application.

## Installation and Usage
### Installation & Usage
 * Clone this repo and navigate to root directory
 * `cd` into frontend file and in terminal, `npm install`
#### Client-side
 * For client, `cd frontend` and `npm run start`, it should automatically load on `http://localhost:3000`

#### Server-side
 * For server, `cd server` and `npm run dev`  
 To use docker:
 To start server and use docker compose for server container,  open terminal and run `bash _scripts/startDev.sh`
 * Starts API and DB services
 * Serves API on `http://localhost:3001`  
 * It is not possible to fully run our API and DB locally due to hidden process.env variables, feel free to substitute the Mongo URI in with your own!

 * To teardown docker compose completely:  
    `bash _scripts/teardown.sh` 
#### Socket.io-side
 To set up socket server:  
* `cd socketio`  
* `npm run dev`


## Technologies:
- Socket.io
- MongoDB, Express.js, React, Node

### Dependencies:
 - Server: cors, socket.io, express, MongoDb, Mongo Atlas, Nodemon, Axios, Docker, Redux

 - Fontawesome, Redux-dev-tools, Redux-thunk

### DevDependencies: 
- Jest, Supertest
- React testing library
## Wins & Challenges

### Wins
- Successful deployment to Netlify and Heroku
- App is responsive and works in both mobile and desktop
- Multiplayer waiting lobby and chat-room functioning across multiple devices
 -Successful implementation of websockets and Redux
### Challenges
- Understanding and implication of sockets
- Duplicated submissions to leaderboard
- Testing with mongoDB

## Future Features
 - Sound effects
 - Question countdown timer
 - Random punishment generation for the losers
 - Displaying scores for all players in the room
