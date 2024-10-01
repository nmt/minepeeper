import { useState } from "react";
import { Grid } from "./Game/Grid";
import { Toolbar } from "./Toolbar";

export type GameStatus = "alive" | "clicking" | "dead";

export const GameContainer = () => {
  const [gameStatus, setGameStatus] = useState("alive" as GameStatus);

  const onMouseDown = () => {
    console.log("hi");
    setGameStatus("clicking");
  };

  const onMouseUp = () => {
    console.log("bye");
    setGameStatus("alive");
  };

  return (
    <>
      <Toolbar gameStatus={gameStatus} />
      <Grid onCellClick={onMouseDown} onCellMouseUp={onMouseUp} />
    </>
  );
};
