import { generateMap } from "./generateGrid";

describe("generateMap", () => {
  it.each`
    bombCount | expected
    ${1}      | ${1}
  `(
    "should generate a map with $bombCount bombs",
    ({ bombCount, expected }) => {
      // const result = generateMap(bombCount);
    }
  );
});
