import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

const WaitingRoom = ({ host }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ready, setReady] = useState("false");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [NoOfQs, setNoOfQs] = useState("");

  // const room = useSelector((state) => state.user.room)
  // need a useEffect that calls on sockets

  const player = host;

  const startGame = (e) => {
    e.preventdefault();
  };

  const joinGame = (e) => {
    e.preventdefault();
  };

  if (player === "HOST") {
    return (
      <div id="waiting-room">
        <span id="waiting-room-heading"> WAITING ROOM </span>
        <button id="start-game" onClick={startGame}>
          Start Game
        </button>
        ;
      </div>
    );
  } else {
    return (
      <div id="waiting-room">
        <span id="waiting-room-heading"> WAITING ROOM </span>
        {ready ? (
          <button role="buttong" id="play-now" onClick={joinGame}>
            FIGHT!
          </button>
        ) : (
          <p>Waiting for host to start the game...</p>
        )}

        <p role="waiting-update" id="waiting-update">
          You will be answering {NoOfQs} questions about {subject} at difficulty
          level {difficulty}
        </p>
      </div>
    );
  }
};

export default WaitingRoom;
