import { useState } from "react";
import { Cell } from "./utils/Cell";
import { CellType, CellWithHidden } from "../types";

let display: any = [];

export const Grid = ({
  onCellClick,
  onCellMouseUp,
  grid,
}: {
  onCellClick: () => void;
  onCellMouseUp: (
    clickedCell: CellType,
    hidden: boolean,
    setHidden: any
  ) => void;
  grid: CellWithHidden[][];
}) => {
  const [gridState, setStateGrid] = useState(grid);
  display = [];

  for (let i = 0; i < gridState.length; i++) {
    display.push(<div key={i} />);
    for (let j = 0; j < gridState[i].length; j++) {
      const cellType = gridState[i][j].cellType;
      display.push(
        <Cell
          key={`${i}${j}`}
          hiddenFromProps={gridState[i][j].hidden}
          cellType={cellType}
          onClick={onCellClick}
          onCellMouseUp={onCellMouseUp}
        />
      );
    }
  }

  return <div className="grid">{display}</div>;
};
