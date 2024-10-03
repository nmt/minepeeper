import { useState } from "react";
import { Cell, CellType } from "./utils/Cell";

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
  grid: CellType[][];
}) => {
  const [gridState, setStateGrid] = useState(grid);
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
