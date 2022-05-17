import React from "react";
import "./style.css";

const Players = ({ players }) => {
  return (
    <p role="waiting-players" className="players">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {players}
    </p>
  );
};

export default Players;
