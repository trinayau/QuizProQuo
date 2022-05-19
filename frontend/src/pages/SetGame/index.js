import React from "react";
import "./style.css";
import { Form } from "../../components";

function SetGame() {
  return (
    <div role="game-setup" aria-label="game-setup" id="game-setup">
      <Form />
    </div>
  );
}

export default SetGame;
