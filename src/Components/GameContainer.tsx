import { useState } from "react";
import { Grid } from "./Game/Grid";
import { Toolbar } from "./Toolbar";
import {
  generateGrid,
  placeBombs,
  placeHints,
} from "./Game/utils/generateGrid";
import { CellType, CellWithHidden } from "./types";

export type GameStatus = "alive" | "clicking" | "lose";

const width = 10;
const height = 10;
const bombCount = 10;

const grid = generateGrid({ width, height });
const bombedGrid: CellType[][] = placeBombs({
  grid,
  bombCount,
  width,
  height,
});
const hintedGrid: CellWithHidden[][] = placeHints(bombedGrid);

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
      <Toolbar bombCount={bombCount} gameStatus={gameStatus} />
      <Grid
        onCellClick={onMouseDown}
        onCellMouseUp={onMouseUp}
        grid={hintedGrid}
      />
    </>
  );
};
