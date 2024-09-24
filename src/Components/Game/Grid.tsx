import { Cell, CellType } from "./utils/Cell";
import { generateGrid, placeBombs } from "./utils/generateGrid";

let display: any = [];
let grid = generateGrid({ width: 10, height: 10 });
const bombedGrid = placeBombs({
  grid,
  bombCount: 10,
  width: 10,
  height: 10,
});

export const Grid = () => {
  for (let i = 0; i < bombedGrid.length; i++) {
    for (let j = 0; j < bombedGrid[i].length; j++) {
      const cellType = bombedGrid[i][j] as CellType;
      display.push(<Cell cellType={cellType} />);
    }
  }
  return display;
};
