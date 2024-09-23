export type Grid = number[][];

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

  return grid;
};

export const isBomb = ({
  grid,
  x,
  y,
}: {
  grid: Grid;
  x: number;
  y: number;
}): boolean => {
  return grid[y][x] === -1;
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
      if (!isBomb({ grid, x, y })) {
        grid[x][y] = -1;
      } else {
        i--;
      }
    }
  }
  return grid;
};
