import React from "react";

const LeaderBoardScore = (props) => {
  return (
    <p role="leaderboardScore" className="leaderboard-score">
      <span>{props.player}</span>
      <span>{props.score}%</span>
    </p>
  );
};

export default LeaderBoardScore;
