import { expect, test } from "vitest";
import { generateEmptyGrid } from "./generateEmptyGrid";

test("generateEmptyGrid", () => {
  const output = generateEmptyGrid(3, 3);
  expect(output).toEqual([
    [
      { cellType: "empty", isShowing: false },
      { cellType: "empty", isShowing: false },
      { cellType: "empty", isShowing: false },
    ],
    [
      { cellType: "empty", isShowing: false },
      { cellType: "empty", isShowing: false },
      { cellType: "empty", isShowing: false },
    ],
    [
      { cellType: "empty", isShowing: false },
      { cellType: "empty", isShowing: false },
      { cellType: "empty", isShowing: false },
    ],
  ]);
});
