import React from "react";
import "./style.css";
import { LeaderBoardTable } from "../../components";
import { useNavigate } from "react-router-dom";

function LeaderBoard() {
  const navigate = useNavigate();

  //navigate to beginning but also refreshes page to change socket Id
  const handleClick = () => {
    navigate("/")
    window.location.reload();
  };

  return (
    <div id="leaderboard">
      <h2>Leaderboard </h2>
      <LeaderBoardTable />
      <button id="start-again" onClick={handleClick}>
        PLAY AGAIN
      </button>
    </div>
  );
}
export default LeaderBoard;
