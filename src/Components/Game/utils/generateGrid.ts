export const generateGrid = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): any => {
  const array = [];
  // Height
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    array.push(row);
  }
  return array;
};
