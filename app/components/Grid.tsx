"use client";

import { useGameContext } from "../context/GameContext";
import Cell from "./Cell";

// TODO: CSS Grid for styling
export const Grid = () => {
  const { gridInfo, updateCell } = useGameContext();

  // TODO: JS debug terminal
  console.log({ gridInfo });

  return (
    <div className="grid">
      {gridInfo.map((cellRow, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {cellRow.map((cellColumn, columnIndex) => (
            <div className="grid-cell" key={columnIndex}>
              <Cell
                cellType={cellColumn.cellType}
                isShowing={cellColumn.isShowing}
                onClick={() => updateCell(rowIndex, columnIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
