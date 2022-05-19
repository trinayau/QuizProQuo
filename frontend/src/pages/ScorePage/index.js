import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { socket } from "../../socket/index.js";
import { ScoreResults } from "../../components";

const ScorePage = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.user.username);
  const score = useSelector((state) => state.quizReducer.score); //get score from state
  const results = useSelector((state) => state.quizReducer.results);
  const percentage = Math.round((score / results.length) * 100);
  const [allScores, setAllScores] = useState([]);
  const [players, setPlayers] = useState("");
  const room = useSelector((state) => state.user.room);
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState(false)

  useEffect(() => {
    let config = {
      score: score,
      room: room,
      username: username,
    };

    socket.emit("score", config, (res) => {
      console.log(res, "res");
      const scoreArray = res.scores.map((player) => {
        return { username: player.username, score: player.score };
      });
      console.log(scoreArray, "scoreArray");
      setAllScores(scoreArray);
    });

  }, []);

  //posts results to server
  const sendResults = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          headers: { "Content-Type": "application/json" },
        };
        const results = {
          player: username,
          score: score,
        };

        const { data } = await axios.post(
          `http://localhost:3001/scoreboard`,
          results,
          options
        );

        if (data.err) {
          throw Error(data.err);
        }
        resolve("Scores sent to leaderboard!");
      } catch (err) {
        reject(`Can't send results: ${err}`);
      }
    });
  };


  useEffect(() => {
    if(score > 0) {
      sendResults();
      console.log('sent results')
    } else{
      setLoser(true)
      console.log('loser set')
    }
  }, []);

  let highest = 0;

  const winnerIs = (player, score) => {
    let str;
    if (players.length <= 1) {
      str = "WINNER";
    } else if (player.length > 1) {
      if (highest <= score) {
        highest = score;
        str = "WINNER!";
        setWinner(player)
      } else {
        str = "LOSER (lol)";
      }
    }
    return str;
  };

  const toLeaderboard = () => {
    navigate("/leaderboard");
  };

  const toHome = () => {
    navigate("/");
  };
  return (
    <div id="score-page">
      <div id="playerscore">
        <h2>You scored: {percentage}% </h2>
        {loser ? <p>You need to get good nub, why don't you try again?</p> : <p>Wow, you actually scored some points! You've been posted to the leaderboard</p>}
{/* commented out because it's not currently working. todo */}
        <div className="score-banner">
          <div className="wrapper">
            {/* <h3>player</h3>
            <h3>score</h3> */}
          </div>

          {/* {allScores &&
            allScores.map((p, i) => (
              <ScoreResults
                className="right"
                player={p.username}
                key={i}
                text={p.score}
                winner={winnerIs(p.username, p.score)}
              />
            ))} */}
        </div>
        {loser ?  <button onClick={toHome} id="toLeaderbrd"><span></span>
          <span></span>
          <span></span>
          <span></span>Try Again
        </button>
        : 
        <button onClick={toLeaderboard} id="toLeaderbrd"><span></span>
          <span></span>
          <span></span>
          <span></span>Go to Leaderboard
        </button>}
      </div>
    </div>
  );
};
export default ScorePage;
