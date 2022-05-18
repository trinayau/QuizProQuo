import {useState, useEffect} from "react";
import "./style.css";
import { LeaderBoardTable } from "../../components";
import { useNavigate } from "react-router-dom";

function LeaderBoard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/scoreboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data));
  }, []);
  //navigate to beginning but also refreshes page to change socket Id
  const handleClick = () => {
    navigate("/")
    window.location.reload();
  };

  const allLeaderboard = leaderboard.map((leaderboard, i) => {
    return (
      <div
        className="leaderboard-score"
        role="leaderboard-score"
        key={i}
      >
        <p>Name: {leaderboard.username}</p>
        <p>Score: {leaderboard.score}</p>
      </div>
    );
  });

  return (
    <div id="leaderboard">
      <h2>Leaderboard </h2>
      {/* <LeaderBoardTable /> */}
      {allLeaderboard}
      <button id="start-again" onClick={handleClick}>
        PLAY AGAIN
      </button>
    </div>
  );
}
export default LeaderBoard;
