import { generateGrid, placeBombs } from "./utils/generateGrid";

let grid = generateGrid({ width: 10, height: 10 });
grid = placeBombs({
  grid,
  bombCount: 10,
  width: 10,
  height: 10,
});

export const Grid = () => {
  return <>{grid}</>;
};
