export const generateGrid = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): number[][] => {
  let grid: number[][] = [];

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
  grid: number[][];
  x: number;
  y: number;
}): boolean => {
  return grid[x][y] === -1;
};

export const placeBombs = ({
  grid,
  bombCount,
  width,
  height,
}: {
  grid: number[][];
  bombCount: number;
  width: number;
  height: number;
}): void => {
  var x, y;

  for (var i = 0; i < bombCount; i++) {
    x = Math.floor(Math.random() * height);
    y = Math.floor(Math.random() * width);

    // Only place a bomb if the area is clear!
    if (!isBomb({ grid, x, y })) {
      grid[x][y] = -1;
    } else {
      i--;
    }
  }
};
