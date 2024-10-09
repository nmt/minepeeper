import { CellWithHidden, CellType } from "../../types";

export type Grid = CellType[][];

export const generateGrid = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): Grid => {
  let grid = [];

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  return grid as Grid; // TODO: Fix this type
};

export const isBomb = (cell: CellType): boolean => {
  return cell === -1;
};

export const placeBombs = ({
  grid,
  bombCount,
  width,
  height,
}: {
  grid: Grid;
  bombCount: number;
  width: number;
  height: number;
}): Grid => {
  const moreBombsThanGridSpace = bombCount > width * height;
  if (bombCount > 0 && !moreBombsThanGridSpace) {
    for (let i = 0; i < bombCount; i++) {
      const x = Math.floor(Math.random() * height);
      const y = Math.floor(Math.random() * width);

      // Only place a bomb if the area is clear!
      if (!isBomb(grid[x][y])) {
        grid[x][y] = -1;
      } else {
        i--;
      }
    }
  }
  return grid;
};

export const placeHints = (bombedGrid: Grid): CellWithHidden[][] => {
  let hintedGrid: Grid = bombedGrid as any;
  // Iterate through all bombs
  for (let i = 0; i < bombedGrid.length; i++) {
    for (let j = 0; j < bombedGrid[i].length; j++) {
      if (isBomb(bombedGrid[j][i])) {
        // Increment all surrounding cells by 1
        hintedGrid = incrementSurroundingCells({
          partiallyHintedGrid: hintedGrid,
          x: j,
          y: i,
        });
      }
    }
  }

  let withHiddenGrid: CellWithHidden[][] = hintedGrid as any;
  for (let i = 0; i < hintedGrid.length; i++) {
    for (let j = 0; j < hintedGrid[i].length; j++) {
      withHiddenGrid[j][i] = {
        cellType: hintedGrid[j][i],
        hidden: true,
      };
    }
  }

  return withHiddenGrid;
};

export const incrementSurroundingCells = ({
  partiallyHintedGrid,
  x,
  y,
}: {
  partiallyHintedGrid: Grid;
  x: number;
  y: number;
}): Grid => {
  let moreHintedGrid = partiallyHintedGrid;

  // Left to right of the bomb
  for (let i = x - 1; i < x + 2; i++) {
    // Don't go beyond the sides of the grid!
    if (i >= 0 && i < moreHintedGrid.length) {
      // Top to bottom of bomb
      for (let j = y - 1; j < y + 2; j++) {
        if (j >= 0 && j < moreHintedGrid[0].length) {
          // If not a bomb, increment
          if (!isBomb(moreHintedGrid[i][j])) {
            moreHintedGrid[i][j] += 1;
          }
        }
      }
    }
  }
  return moreHintedGrid;
};
