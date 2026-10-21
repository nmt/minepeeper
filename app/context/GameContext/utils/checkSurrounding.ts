import { CellProps } from "@/app/components/Cell";

export const checkSurrounding = ({
  listOfThingsAlreadyChecked,
  grid,
  currentRowIndex,
  currentColIndex,
}: {
  listOfThingsAlreadyChecked: [number, number][];
  grid: CellProps[][];
  currentRowIndex: number;
  currentColIndex: number;
}): CellProps[][] => {
  const leftBoundary = 0;
  const rightBoundary = grid[0].length - 1;
  const topBoundary = 0;
  const bottomBoundary = grid.length - 1;

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
    const newRow = currentRowIndex + rowOffset;
    const newCol = currentColIndex + colOffset;

    if (
      newRow >= topBoundary &&
      newRow <= bottomBoundary &&
      newCol >= leftBoundary &&
      newCol <= rightBoundary
    ) {
      console.log(`${newRow}, ${newCol}`);
      // Push all surrounding cells
      // For all of the neighbourOffsets, push
      // listToBeUpdated.push(tempCell)
      // change to isShowing
      grid[newRow][newCol].isShowing = true;

      if (
        grid[newRow][newCol].cellType === 0 &&
        !listOfThingsAlreadyChecked.find(
          ([rowIndex, colIndex]) =>
            rowIndex === currentRowIndex && colIndex === currentColIndex,
        )
      ) {
        console.log("recursing");
        listOfThingsAlreadyChecked.push([currentRowIndex, currentColIndex]);
        checkSurrounding({
          listOfThingsAlreadyChecked,
          grid,
          currentRowIndex: newRow,
          currentColIndex: newCol,
        });
      }
    }
  }

  return grid;
};
