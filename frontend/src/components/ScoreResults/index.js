import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

const ScoreResults = ({ text, player, winner }) => {
  const results = useSelector((state) => state.quizReducer.results);

  const calc = Math.round((text / results.length) * 100);

  return (
    <>
      {winner ? (
        <table className="wrapper">
          <tr>
            <th> STATUS </th>
            <th> PLAYER </th>
            <th> SCORE </th>
          </tr>
          <tr>
            <td> {winner}</td>
            <td> {player} </td>
            <td> {calc}% </td>
          </tr>
        </table>
      ) : (
        <td>{player}</td>
      )}
    </>
  );
};

export default ScoreResults;
