import React from "react";
import { WaitingRoom } from "../../components";
import "./style.css";
const Lobby = () => {
  return (
    <div role="Lobby" className="lobby">
      <WaitingRoom />
    </div>
  );
};

export default Lobby;
