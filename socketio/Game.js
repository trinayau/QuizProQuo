// const {GameManager} = require("js-gamemanager");

// const games = new GameManager();

class Games {
    constructor() {

        this.games = []; 
        this.players = [];
    }

    addGame (hostID, roomName, difficulty, count, subject) {
                let game = {
                    host: hostID,
                    room: roomName,
                    difficulty: difficulty,
                    count: count,
                    subject: subject,
                    players: [],
                    active: false
                }
        
                // let game = new Game(hostID, roomName, difficulty, count, subject);
                this.games.push(game);
                // this.games.forEach(room => console.log(room))
                return game;
    }
        
    addPlayer (username, room, hostID) {
        let player = {
            username: username, 
            roomName: room, 
            roomID: hostID,
            score: 0
        }

        this.players.push(player);
        let game = this.games.find( y => y.room == room);
        try{
            game.players.push(player);
            console.log(game.players)
            return player;
        }  catch (err) {
            console.log("add player has : " + err)
            return { err: err }   
        }
    }

    getPlayersForGame(roomName) {

        //get all players
        const game = this.games.filter(game => game.room === roomName);
        console.log(game.players)
    }


    filterRoom (roomName) {
        return this.games.room === roomName; 
    }

    // getPlayerCount = (roomName) => {
    //     console.log("check player count")
    //     const game =  this.games.filter(game => game.room === roomName);
    //     console.log(game)
    //     console.log(game.getPlayerCount)
    //     // console.log(game.players.length); 
    //     return game.players.length; 
    // }

    //check the room id
    //get players with room id
    getPlayerData (roomName) {
        //find room in games
        // console.log("player data")
        // const game =  this.games.filter(game => game.room === roomName);
        let game = this.games.find( y => y.room == roomName);
        // const players = this.players.filter(player => player.room === roomName)
        if(game === undefined ){
            return "error"
        }
        return game.players;
    }

    addScore(room, username, score){
        //find the game
        let game = this.games.find( y => y.room == room);
        //in the room find the player usernmae
        // console.log(game)
        // console.log(username)
        try{
            let player = game.players.find(p => p.username === username)
            //and add the score
            player.score = score; 
            //return all player scores for the gamae getPlayerData()
            return game.players
        }
        catch (err) {
            console.log("add score has : " + err)
            return { err: err }   
        }
    }
  
    getGame (roomName){
        let game = this.games.find( y => y.room == roomName);
        return game;

    }

    canRoomBeJoined(roomName){
            console.log("Looking for room")
                const game =  this.games.filter(game => {console.log(game.room === roomName); return game.room === roomName});
                console.log('game is:', game)
                if (game.length > 0){
                    return game;
                } else {
                    return 'ERROR'
                }
    }
    getGameByRoom(roomName) {
        console.log(roomName)
        // if(this.games){
        this.games.forEach(game => console.log(game))

        const game =  this.games.filter(game => {console.log(game.room === roomName); return game.room === roomName});
       
        return game;
    };

    checkRoomName(room) {
        let game = this.getGameByRoom(room);
        if(game.length > 0 ) {
            return false;
        } else {
            return true;
        };
    };
}

module.exports = {Games};

