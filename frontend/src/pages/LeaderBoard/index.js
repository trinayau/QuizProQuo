import React from "react";
import "./style.css";
import { LeaderBoardTable } from "../../components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/fontawesome-free-solid";

function LeaderBoard() {
  const navigate = useNavigate();

  //navigate to beginning but also refreshes page to change socket Id
  const handleClick = () => {
    navigate("/");
    window.location.reload();
  };

  const backBtn = () => {
    navigate(-1);
  };

  return (
    <div id="leaderboard">
      <button id="backBtn" onClick={backBtn}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} bounce /> BACK
      </button>
      <h2>Leaderboard </h2>
      <LeaderBoardTable />
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
