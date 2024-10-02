import { useState } from "react";
import { Grid } from "./Game/Grid";
import { Toolbar } from "./Toolbar";
import { CellType } from "./Game/utils/Cell";

export type GameStatus = "alive" | "clicking" | "lose";

export const GameContainer = () => {
  const [gameStatus, setGameStatus] = useState("alive" as GameStatus);

  const onMouseDown = () => {
    // If not hidden
    setGameStatus("clicking");
  };

  const onMouseUp = (
    clickedCell: CellType,
    hidden: boolean,
    setHidden: any
  ) => {
    // Reveal cell/s
    setHidden(false);
    if (clickedCell === -1) {
      setGameStatus("lose");
    } else {
      if (hidden) {
      }
      setGameStatus("alive");
    }
  };

  return (
    <>
      <Toolbar gameStatus={gameStatus} />
      <Grid onCellClick={onMouseDown} onCellMouseUp={onMouseUp} />
    </>
  );
};
