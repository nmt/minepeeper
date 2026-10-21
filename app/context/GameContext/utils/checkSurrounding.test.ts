import { expect, test } from "vitest";
import { describe } from "node:test";
import { CellProps } from "@/app/components/Cell";
import { checkSurrounding } from "./checkSurrounding";

describe("generateEmptyGrid", () => {
  test("it should generate a 3x3 grid with empty cells", () => {
    /*
    
      C0    C1    C2    C3    C4    C5
    +-----+-----+-----+-----+-----+-----+
R0  |  0  |  1  |  1  |  1  |  0  |  0  |
    +-----+-----+-----+-----+-----+-----+
R1  |  1  |  2  |  B  |  1  |  0  |  0  |
    +-----+-----+-----+-----+-----+-----+
R2  |  1  |  B  |  2  |  1  |  0  |  0  |
    +-----+-----+-----+-----+-----+-----+
R3  |  1  |  1  |  1  |  0  |  0  |  0  |
    +-----+-----+-----+-----+-----+-----+
*/
    const input: CellProps[][] = [
      [
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
      ],
      [
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 2,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: "bomb",
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
      ],
      [
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: "bomb",
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 2,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
      ],
      [
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
      ],
    ];

    /*
      C0    C1    C2    C3    C4    C5
    +-----+-----+-----+-----+-----+-----+
R0  |  0  |  1  |  1  |  1* |  0* |  0* |
    +-----+-----+-----+-----+-----+-----+
R1  |  1  |  2  |  B  |  1* |  0* |  0* |
    +-----+-----+-----+-----+-----+-----+
R2  |  1  |  B  |  2* |  1* |  0* |  0* |
    +-----+-----+-----+-----+-----+-----+
R3  |  1  |  1  |  1* |  0* |  0* |  0* |
    +-----+-----+-----+-----+-----+-----+
*/

    const output: CellProps[][] = [
      [
        {
          cellType: 0,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
      ],
      [
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 2,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: "bomb",
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
      ],
      [
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: "bomb",
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 2,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
      ],
      [
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: false,
        },
        {
          cellType: 1,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
        {
          cellType: 0,
          isFlagged: false,
          isShowing: true,
        },
      ],
    ];

    expect(
      checkSurrounding({
        listOfThingsAlreadyChecked: [],
        grid: input,
        currentRowIndex: 1,
        currentColIndex: 4,
      }),
    ).toEqual(output);
  });
});
