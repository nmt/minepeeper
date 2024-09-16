import { generateGrid } from "./generateGrid";

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

  it.each`
    bombCount | expected
    ${1}      | ${1}
  `(
    "should generate a map with $bombCount bombs",
    ({ bombCount, expected }) => {
      // const result = generateGrid(bombCount);
    }
  );
});
