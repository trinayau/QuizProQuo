<<<<<<< HEAD
import React from "react";
import { WaitingRoom } from "../../components";
import "./style.css"
const Lobby = () => {
  return (
    <div className="lobby">
      <WaitingRoom />
    </div>
=======
import React, { useState, useEffect } from "react";
import { WaitingRoom, Players } from "../../components";
import { useSelector } from "react-redux";

const Lobby = ({}) => {
  const [players, setPlayers] = useState("");
  const room = useSelector((state) => state.user.room);
  const host = useSelector((state) => state.user.user.type);

  return (
    <>
      <WaitingRoom host={host} />

      <div id="players">
        {players &&
          players.map((player) => (
            <Players key={players.indexOf(player)} player={player} />
          ))}
      </div>
    </>
>>>>>>> 0ade8f4f18921d2cf505b5ab101306905263f2c2
  );
};

export default Lobby;
