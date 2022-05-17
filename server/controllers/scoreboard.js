const Score = require('../models/scores')

async function index(req,res) {
    try{ console.log("Controller called")
        const scoreEntry = await Score.all;
        console.log("This is a test", scoreEntry);
        res.status(200).json(scoreEntry);
    } catch(err){
        res.status(500).send(err);
    }
}
//Maybe need to work on a show all static function in the models

    async function show(req, res){
        try {
            const scoreEntry = await Score.findByUserName(req.params.id);
            res.status(200).json(scoreEntry);
        } catch (err) {
            res.status(404).json({ err });
        }
    }

async function create(req, res) {
    try {
        const scoreEntry = await Score.create(req.body);
        res.status(201).json(scoreEntry);
    } catch (err) {
        res.status(422).json({ err });
    }
}

module.exports = { index, show, create };