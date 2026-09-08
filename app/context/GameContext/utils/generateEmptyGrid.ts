// 2D grid (based on width and height) output: Cell[][]
// 0,0,0
// 0,0,0
// 0,0,0

import { CellProps } from "@/app/components/Cell";

// Checks to make sure width and height are greater than 3
export const generateEmptyGrid = (
  width: number,
  height: number,
): CellProps[][] => {
  if (width < 3 || height < 3) {
    throw new Error("Grid size must be at least 3x3");
  }
  return [...Array(height)].map(function () {
    return [...Array(width)].map(function () {
      return { cellType: 0, isFlagged: false, isShowing: false };
    });
  });
};

// Place bombs
export const placeBombs = (
  grid: CellProps[][],
  numOfBombs: number,
): CellProps[][] => {
  const tempGrid = [...grid];

  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  if (numOfBombs === 0) {
    throw new Error("Bomb count must be greater than 0");
  }
  const totalNumberOfCells = gridHeight * gridWidth;
  if (numOfBombs >= 0.8 * totalNumberOfCells) {
    throw new Error(
      "Too many bombs for the grid size. Bomb count must be less than 80% of total cells.",
    );
  }

  // Randomly select where to place bombs
  for (let i = 0; i < numOfBombs; i++) {
    // Randomly select a cell
    const randomRow = Math.floor(Math.random() * gridHeight);
    const randomCol = Math.floor(Math.random() * gridWidth);

    // Only place bomb if the area is clear
    if (tempGrid[randomRow][randomCol].cellType === 0) {
      tempGrid[randomRow][randomCol].cellType = "bomb";
    } else {
      i--;
    }
  }

  return tempGrid;
};

// Put number hints in around bombs
export const generateHints = (grid: CellProps[][]): CellProps[][] => {
  // TODO: Refactor into reusabble util since its repeated in generateEmptyGrid and placeBombs
  // const gridWidth = grid[0].length;
  // const gridHeight = grid.length;

  // if (gridWidth < 3 || gridHeight < 3) {
  //   throw new Error("Grid size must be at least 3x3");
  // }

  // Loop through the grid and check for bombs
  // For each bomb, generate hints immediately
  // guardrails - make sure doesnt go out of bounds
  const tempGrid = [...grid];

  const leftBoundary = 0;
  const rightBoundary = grid[0].length - 1;
  const topBoundary = 0;
  const bottomBoundary = grid.length - 1;

  for (let row = 0; row < tempGrid.length; row++) {
    for (let col = 0; col < tempGrid[row].length; col++) {
      if (tempGrid[row][col].cellType === "bomb") {
        // guardrails - make sure doesnt go out of bounds
        // 1,2
        // top left = (x) 1-1 = 0, (y) 2-1 = 1
        // top = (x) 1-1 = 0, (y) 2 = 2
        // top right = (x) 1-1 = 0, (y) 2+1 = 3
        // left = (x) 1, (y) 2-1 = 1
        // right = (x) 1, (y) 2+1 = 3
        // bottom left = (x) 1+1 = 2, (y) 2-1 = 1
        // bottom = (x) 1+1 = 2, (y) 2 = 2
        // bottom right = (x) 1+1 = 2, (y) 2+1 = 3

        const neighbourOffsets = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];

        for (const [rowOffset, colOffset] of neighbourOffsets) {
          const newRow = row + rowOffset;
          const newCol = col + colOffset;

          if (
            newRow >= topBoundary &&
            newRow <= bottomBoundary &&
            newCol >= leftBoundary &&
            newCol <= rightBoundary
          ) {
            const tempCell = { ...tempGrid[newRow][newCol] };
            if (isNotBomb(tempCell)) {
              tempCell.cellType += 1;
            }
            tempGrid[newRow][newCol] = tempCell;
          }
        }
      }
    }
  }

  return tempGrid;
};

type CellPropsWithoutBomb = Omit<CellProps, "cellType"> & {
  cellType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

const isNotBomb = (cell: CellProps): cell is CellPropsWithoutBomb => {
  return cell.cellType !== "bomb";
};
