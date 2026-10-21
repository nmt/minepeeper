"use client";

import { useGameContext } from "../context/GameContext/GameContext";
import Cell from "./Cell";

export const Grid = () => {
  const { gridInfo, showCell, flagCell } = useGameContext(); // 'subscriber'

  const width = gridInfo[0].length;
  const height = gridInfo.length;

  return (
    <div
      class={`grid grid-rows-[repeat(var(--grid-rows,${height}),minmax(0,1fr))] grid-cols-[repeat(var(--grid-cols,${width}),minmax(0,1fr))] gap-${height}`}
      style={{ "--grid-rows": height, "--grid-cols": width }}
    >
      {gridInfo.map((cellRow, rowIndex) =>
        cellRow.map((cellColumn, columnIndex) => (
          <Cell
            key={`${cellColumn}-${columnIndex}`}
            cellType={cellColumn.cellType}
            isFlagged={cellColumn.isFlagged}
            isShowing={cellColumn.isShowing}
            onClick={() => showCell(rowIndex, columnIndex)}
            onRightClick={() => flagCell(rowIndex, columnIndex)}
          />
        )),
      )}
    </div>
  );
};
