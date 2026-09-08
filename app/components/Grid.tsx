"use client";

import { useGameContext } from "../context/GameContext/GameContext";
import Cell from "./Cell";

// TODO: CSS Grid for styling
export const Grid = () => {
  const { gridInfo, showCell, flagCell } = useGameContext(); // 'subscriber'

  const width = gridInfo[0].length;
  const height = gridInfo.length;

  return (
    <div
      className={`grid grid-cols-[var(--grid-width)] grid-rows-[var(--grid-height)]`}
      style={{
        "--grid-width": `repeat(${width}, minmax(0, 1fr))`,
        "--grid-height": `repeat(${height}, minmax(0, 1fr))`,
      }}
    >
      {gridInfo.map((cellRow, rowIndex) => (
        <div className={`grid-row row-span-${width}`} key={rowIndex}>
          {cellRow.map((cellColumn, columnIndex) => (
            <div className={`grid-cell col`} key={columnIndex}>
              <Cell
                cellType={cellColumn.cellType}
                isFlagged={cellColumn.isFlagged}
                isShowing={cellColumn.isShowing}
                onClick={() => showCell(rowIndex, columnIndex)}
                onRightClick={() => flagCell(rowIndex, columnIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
