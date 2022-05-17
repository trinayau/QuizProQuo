# QuizProQuo
 Lap 3 quiz website built with React, MongoDB, Express and Node.js
 Project team consists of:
 * [Andrew](https://github.com/akennedy205)
 * [Diren](https://github.com/Dnayir)
 * [Yusra](https://github.com/yusra-tahir)
 * [Trina](https://github.com/trinayau)

## Project Description
This is a Lap 3 group project to make a quiz using React.
## Installation and Usage
### Installation
 * Clone this repo and navigate to root directory
 * `cd` into frontend file and in terminal, `npm install`
### Usage
 * For client, `cd frontend` and `npm run start`, it should automatically load on `http://localhost:3000`
 * For server, `cd server` and `npm run dev`  
 To use docker:
 To start server and use docker compose for server container,  open terminal and run `bash _scripts/startDev.sh`
 * Starts API and DB services
 * Serves API on `http://localhost:3001`  
To teardown docker compose completely:  
`bash _scripts/teardown.sh`  
To set up socket server:  
* `cd socketio`  
* `npm run dev`




