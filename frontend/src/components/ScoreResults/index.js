import React from "react";
import { useSelector } from "react-redux";

const ScoreResults = ({ text, player, winner }) => {
  const results = useSelector((state) => state.quizReducer.results);

  const calc = Math.round((text / results.length) * 100);

  return(
    <>
      <div className="wrapper">
        {winner ? (
          <h4>
            {player} {winner}
          </h4>
        ) : (
          <h4>{player}</h4>
        )}
        <h4>{calc}%</h4>
      </div>
    </>
  );
};

export default ScoreResults;
