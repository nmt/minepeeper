import { generateGrid, isBomb, placeBombs, placeHints } from "./generateGrid";

describe("generateGrid", () => {
  describe("generateGrid", () => {
    it.each`
      width | height | expectedWidth | expectedHeight
      ${1}  | ${1}   | ${1}          | ${1}
      ${2}  | ${2}   | ${2}          | ${2}
      ${5}  | ${10}  | ${5}          | ${10}
    `(
      "should generate a map with $width width and $height height",
      ({ width, height, expectedWidth, expectedHeight }) => {
        const result = generateGrid({ width, height });
        expect(result.length).toStrictEqual(expectedHeight);
        expect(result[0].length).toStrictEqual(expectedWidth);
      }
    );
  });

  describe("isBomb", () => {
    it.each`
      grid                                             | y    | x    | expected
      ${[[0]]}                                         | ${0} | ${0} | ${false}
      ${[[-1]]}                                        | ${0} | ${0} | ${true}
      ${[[0, 0], [-1, 0]]}                             | ${0} | ${0} | ${false}
      ${[[0, 0], [-1, 0]]}                             | ${1} | ${0} | ${true}
      ${[[-1, -1], [-1, 0]]}                           | ${1} | ${1} | ${false}
      ${[[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, -1]]} | ${3} | ${2} | ${true}
    `(
      "should return $expected when grid[$x][$y]",
      ({ grid, x, y, expected }) => {
        const result = isBomb(grid[y][x]);
        expect(result).toStrictEqual(expected);
      }
    );
  });

  describe("placeBombs", () => {
    it.each`
      bombCount | width | height | expected
      ${1}      | ${1}  | ${1}   | ${1}
      ${3}      | ${5}  | ${5}   | ${3}
      ${0}      | ${5}  | ${5}   | ${0}
      ${10}     | ${1}  | ${1}   | ${0}
    `(
      "should place $expected bombs on the $width x $height grid when bombCount is $bombCount",
      ({ bombCount, width, height, expected }) => {
        const grid = generateGrid({ width, height });
        const bombedGrid = placeBombs({ grid, bombCount, width, height });

        let count = 0;
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            if (bombedGrid[i][j] === -1) {
              count++;
            }
          }
        }
        expect(count).toStrictEqual(expected);
      }
    );
  });

  // describe.only("placeHints", () => {
  //   it.each`
  //     grid                                                 | expected
  //     ${[[0]]}                                             | ${[[0]]}
  //     ${[[-1]]}                                        | ${[[-1]]}
  //     ${[[0, 0], [-1, 0]]}                             | ${[[1, 1], [-1, 1]]}
  //     ${[[0, 0], [-1, -1]]}                        | ${[[2, 2], [-1, -1]]}
  //     ${[[-1, -1], [-1, 0]]}                   | ${[[-1, -1], [-1, 3]]}
  //     ${[[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, -1]]} | ${[[0, 0, 0], [0, 0, 0], [0, 1, 1], [0, 1, -1]]}
  //   `("should return $expected when grid[$x][$y]", ({ grid, expected }) => {
  //     const result = placeHints(grid);
  //     expect(result).toStrictEqual(expected);
  //   });
  // });
});
