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
  );
};

export default Lobby;
