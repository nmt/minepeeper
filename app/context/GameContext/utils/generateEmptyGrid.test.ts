import { assert, expect, test } from "vitest";
import {
  generateEmptyGrid,
  generateHints,
  placeBombs,
} from "./generateEmptyGrid";
import { describe } from "node:test";
import { CellProps } from "@/app/components/Cell";

describe("generateEmptyGrid", () => {
  test("it should generate a 3x3 grid with empty cells", () => {
    const output = generateEmptyGrid(3, 3);
    expect(output).toEqual([
      [
        { cellType: 0, isShowing: false },
        { cellType: 0, isShowing: false },
        { cellType: 0, isShowing: false },
      ],
      [
        { cellType: 0, isShowing: false },
        { cellType: 0, isShowing: false },
        { cellType: 0, isShowing: false },
      ],
      [
        { cellType: 0, isShowing: false },
        { cellType: 0, isShowing: false },
        { cellType: 0, isShowing: false },
      ],
    ]);
  });

  test("it should throw error when grid is smaller than 3x3", () => {
    assert.throws(
      () => generateEmptyGrid(2, 2),
      "Grid size must be at least 3x3",
    );
  });
});

describe("placeBombs", () => {
  const input = generateEmptyGrid(3, 3);

  test("it should throw error when input bomb parameter is 0", () => {
    assert.throws(
      () => placeBombs(input, 0),
      "Bomb count must be greater than 0",
    );
  });

  test("it should throw error when input bomb parameter is greater than threshold (80%)", () => {
    assert.throws(
      () => placeBombs(input, 8),
      "Too many bombs for the grid size. Bomb count must be less than 80% of total cells.",
    );
  });

  test("it should place bombs when input bomb parameter is greater than 0 but lower than threshold", () => {
    const output = placeBombs(input, 5);

    // Iterate through output and count bombs
    const bombCount = 0;

    const count = output.reduce(
      (accumulator: number, currentRow) =>
        accumulator +
        currentRow.filter((item) => item.cellType === "bomb").length,
      bombCount,
    );

    expect(count).toBe(5);
  });

  describe("generateHints", () => {
    test("it should generate hints for one bomb", () => {
      // [
      //   [0, 1, 1],
      //   [0, 1, *],
      //   [0, 1, 1],
      // ]
      const input: CellProps[][] = [
        [
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
        ],
        [
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: "bomb",
            isShowing: false,
            isFlagged: false,
          },
        ],
        [
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
        ],
      ];
      const expectedOutput: CellProps[][] = [
        [
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 1,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 1,
            isShowing: false,
            isFlagged: false,
          },
        ],
        [
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 1,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: "bomb",
            isShowing: false,
            isFlagged: false,
          },
        ],
        [
          {
            cellType: 0,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 1,
            isShowing: false,
            isFlagged: false,
          },
          {
            cellType: 1,
            isShowing: false,
            isFlagged: false,
          },
        ],
      ];

      assert.deepEqual(generateHints(input), expectedOutput);
    });
  });

  test("it should generate hints for five bombs", () => {
    // [
    //   [3, *, 3],
    //   [*, *, *],
    //   [2, 4, *],
    // ]
    const input: CellProps[][] = [
      [
        {
          cellType: 0,
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: 0,
          isShowing: false,
          isFlagged: false,
        },
      ],
      [
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
      ],
      [
        {
          cellType: 0,
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: 0,
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
      ],
    ];
    const expectedOutput: CellProps[][] = [
      [
        {
          cellType: 3,
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: 3,
          isShowing: false,
          isFlagged: false,
        },
      ],
      [
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
      ],
      [
        {
          cellType: 2,
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: 4,
          isShowing: false,
          isFlagged: false,
        },
        {
          cellType: "bomb",
          isShowing: false,
          isFlagged: false,
        },
      ],
    ];

    assert.deepEqual(generateHints(input), expectedOutput);
  });
});
