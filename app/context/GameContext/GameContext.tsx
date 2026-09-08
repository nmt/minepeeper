"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CellProps } from "../../components/Cell";
import {
  generateEmptyGrid,
  generateHints,
  placeBombs,
} from "./utils/generateEmptyGrid";

// State: Things that are reused in the context
interface IGameContext {
  gridInfo: CellProps[][];
  showCell: (rowIndex: number, columnIndex: number) => void;
  flagCell: (rowIndex: number, columnIndex: number) => void;
}

// Default values (if GameContextProvider is not provided, these values will be used)
const defaultContextValue: IGameContext = {
  gridInfo: [],
  showCell: () => {},
  flagCell: () => {},
};
export const GameContext = createContext<IGameContext>(defaultContextValue);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GameContextProps {}

// Context is like state
// Provider is like a component that holds context
// Provides the values that can change
// Has the context of the game state
export const GameContextProvider = ({
  //   gridWidth,
  //   gridHeight,
  children,
}: PropsWithChildren<GameContextProps>) => {
  // Create cellsArray that is dynamic
  // in the future, we will create cellsArray based on the gridWidth and gridHeight, part where we render bombs and stuff
  // whats cellsArray - info about the cell, knowing what type it is, it also has the state of isShowing (open or not)

  const onClick = (rowIndex: number, columnIndex: number) => {
    const newCellsArrayValue = [...cellsArray];
    newCellsArrayValue[rowIndex][columnIndex].isShowing = true;

    setCellsArray(newCellsArrayValue);
    console.log({ cellsArray });
  };

  const onRightClick = (rowIndex: number, columnIndex: number) => {
    const newCellsArrayValue = [...cellsArray];
    newCellsArrayValue[rowIndex][columnIndex].isFlagged =
      !newCellsArrayValue[rowIndex][columnIndex].isFlagged;

    setCellsArray(newCellsArrayValue);
    console.log({ cellsArray });
  };

  const generateFreshGrid = (
    rows: number,
    columns: number,
    bombCount: number,
  ) => {
    return generateHints(
      placeBombs(generateEmptyGrid(rows, columns), bombCount),
    );
  };

  const [cellsArray, setCellsArray] = useState(generateFreshGrid(6, 4, 10));

  return (
    <GameContext.Provider
      value={{
        gridInfo: cellsArray,
        showCell: onClick,
        flagCell: onRightClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
