const init = require("../db/mongoInit");

//outlining the data
class Score {
    constructor(data) {
        this.gameId = data.gameId;
        this.username = data.username;
        this.score = data.score;
    }

    //add new score information to the leaderboard
    static get all(){
        return new Promise(async(resolve, reject) => {
            try{
                console.log("String here happening", init);
                const db = await init();
                const dbData = await db.collection("scoreBoard").find({}).toArray();
                const allScores = dbData.map((d) => new Score(d));
                if (!allScores.length){
                    throw new Error(
                        "This is a filler error message. Please change me at some point. Thank you"
                    );
                } 
                resolve(allScores);
            } catch(err){
                reject(`Error retrieving scores: ${err.message}`);
            }
        })
    };

    //Writing a score to the database
        static create(newScoreEntry) {
            return new Promise (async (res, rej) => {
                try{
                    const db = await init();
                    const createScoreEntry = await db
                    .collection("scoreBoard")
                    .findOneAndUpdate(
                        { gameId: newScoreEntry.gameId },
                        { username: newScoreEntry.username },
                        //check back here. may be need the { $push: {}} Operator
                        { score: newScoreEntry.score },
                    );
                    res(createScoreEntry);
                } catch (err) {
                    rej(`Error creating score entry: ${err}`);
                }
            });
        }


//finding result by username from seeds
    static findByUserName(username){
        return new Promise(async(res, rej) => {
        try {
            const db= await init();
            const user = await db
            .collection("scoreBoard")
            .findOne({username:username});
            res(user);
        } catch (err) {
            rej(`Error retrieving usernames: ${err}`);
        }
    })
}

//finding result by score value

}


//consult ADAY repo for the static get

module.exports = Score;
