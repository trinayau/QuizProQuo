import { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/fontawesome-free-solid";

function LeaderBoard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch("https://quizproquo-api.onrender.com/scoreboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data));
  }, []);
  //navigate to beginning but also refreshes page to change socket Id
  const handleClick = () => {
    navigate("/");
    window.location.reload();
  };

  const sorting = (e) => {
    console.log("sorting");
    const value = e.target.textContent;
    const sorted = [...leaderboard].sort((a, b) => {
      if (value === "ASCENDING") {
        return a.score - b.score;
      } else if (value === "DESCENDING") {
        return b.score - a.score;
      }
      return a.score;
    });
    console.log(sorted);
    setLeaderboard(sorted);
  };

  const allLeaderboard = leaderboard.map((leaderboard, i) => {
    return (
      <div
        className="leaderboard-score"
        role="leaderboard-score"
        key={i}
        style={{ display: "flex" }}
      >
        <p>{leaderboard.username} </p>
        <p> {leaderboard.score}</p>
      </div>
    );
  });

  const homeBtn = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div role="leaderboard" id="leaderboard">
      <button aria-label="backBtn" id="backBtn" onClick={homeBtn}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} bounce /> HOME
      </button>
      <h2 role="leaderboard-heading">Leaderboard </h2>

      <div role="leaderboard-container" className="leaderboard-container">
        <div className="sorting-btns">
          <button onClick={sorting} role="Ascending">
            ASCENDING
          </button>
          <button onClick={sorting} role="Descending">
            DESCENDING
          </button>
        </div>
        <div id="leadBrd-table">
          <p>NAME</p>
          <p>SCORE</p>
        </div>
        {allLeaderboard}
      </div>
      <button id="start-again" onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        PLAY AGAIN
      </button>
    </div>
  );
}
export default LeaderBoard;
