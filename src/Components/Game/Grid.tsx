import { useState } from "react";
import { Cell, CellType } from "./utils/Cell";
import { generateGrid, placeBombs } from "./utils/generateGrid";

const width = 5;
const height = 5;
const bombCount = 3;

let grid = generateGrid({ width, height });
let bombedGrid: CellType[][];
let display: any = [];

bombedGrid = placeBombs({
  grid,
  bombCount,
  width,
  height,
});

export const Grid = () => {
  const [gridState, setStateGrid] = useState(bombedGrid);

  for (let i = 0; i < gridState.length; i++) {
    display.push(<div />);
    for (let j = 0; j < gridState[i].length; j++) {
      const cellType = gridState[i][j] as CellType;
      display.push(<Cell key={`${i}${j}`} cellType={cellType} />);
    }
  }

  return <div className="grid">{display}</div>;
};
