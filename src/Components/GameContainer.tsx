import { useState } from "react";
import { Grid } from "./Game/Grid";
import { Toolbar } from "./Toolbar";

export type GameStatus = "alive" | "clicking" | "dead";

export const GameContainer = () => {
  const [gameStatus, setGameStatus] = useState("alive" as GameStatus);

  const onMouseDown = () => {
    setGameStatus("clicking");
  };

  const onMouseUp = () => {
    setGameStatus("alive");
  };

  return (
    <>
      <Toolbar gameStatus={gameStatus} />
      <Grid onCellClick={onMouseDown} onCellMouseUp={onMouseUp} />
    </>
  );
};
