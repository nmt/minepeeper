import { generateGrid, isBomb, placeBombs } from "./generateGrid";

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
      grid                                                                                                                   | y    | x    | expected
      ${[["empty"]]}                                                                                                         | ${0} | ${0} | ${false}
      ${[["bomb"]]}                                                                                                          | ${0} | ${0} | ${true}
      ${[["empty", "empty"], ["bomb", "empty"]]}                                                                             | ${0} | ${0} | ${false}
      ${[["empty", "empty"], ["bomb", "empty"]]}                                                                             | ${1} | ${0} | ${true}
      ${[["bomb", "bomb"], ["bomb", "empty"]]}                                                                               | ${1} | ${1} | ${false}
      ${[["empty", "empty", "empty"], ["empty", "empty", "empty"], ["empty", "empty", "empty"], ["empty", "empty", "bomb"]]} | ${3} | ${2} | ${true}
    `(
      "should return $expected when grid[$x][$y]",
      ({ grid, x, y, expected }) => {
        const result = isBomb({ grid, x, y });
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
            if (bombedGrid[i][j] === "bomb") {
              count++;
            }
          }
        }
        expect(count).toStrictEqual(expected);
      }
    );
  });
});
