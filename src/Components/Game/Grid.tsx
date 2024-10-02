import { useState } from "react";
import { Cell, CellType } from "./utils/Cell";
import { generateGrid, placeBombs, placeHints } from "./utils/generateGrid";

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
const hintedGrid = placeHints(bombedGrid);

let display: any = [];

export const Grid = ({
  onCellClick,
  onCellMouseUp,
}: {
  onCellClick: () => void;
  onCellMouseUp: (
    clickedCell: CellType,
    hidden: boolean,
    setHidden: any
  ) => void;
}) => {
  const [gridState, setStateGrid] = useState(hintedGrid);
  display = [];

  for (let i = 0; i < gridState.length; i++) {
    display.push(<div key={i} />);
    for (let j = 0; j < gridState[i].length; j++) {
      const cellType = gridState[i][j] as CellType;
      display.push(
        <Cell
          key={`${i}${j}`}
          cellType={cellType}
          onClick={onCellClick}
          onCellMouseUp={onCellMouseUp}
        />
      );
    }
  }

  return <div className="grid">{display}</div>;
};
