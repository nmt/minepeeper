import { cell } from "./cell";

describe("cell function", () => {
  it.each`
    cellType | expected
    ${"one"} | ${"🐍"}
  `(
    "returns $expected when cellType is $cellType",
    ({ cellType, expected }) => {
      expect(cell(cellType)).toBe(expected);
    }
  );
});
