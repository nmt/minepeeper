"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CellProps } from "../components/Cell";

// State: Things that are reused in the context
interface IGameContext {
  gridInfo: CellProps[][];
  updateCell: (rowIndex: number, columnIndex: number) => void;
}

// Default values (if GameContextProvider is not provided, these values will be used)
const defaultContextValue: IGameContext = {
  gridInfo: [],
  updateCell: () => {},
};
export const GameContext = createContext<IGameContext>(defaultContextValue);

interface GameContextProps {}

// Provides the values that can change
// Has the context of the game state
export const GameContextProvider = ({
  //   gridWidth,
  //   gridHeight,
  children,
}: PropsWithChildren<GameContextProps>) => {
  // TODO: Calculate gridInfo based on the gridWidth and gridHeight, and update it when they change

  // Create cellsArray that is dynamic
  // in the future, we will create cellsArray based on the gridWidth and gridHeight, part where we render bombs and stuff
  // whats cellsArray - info about the cell, knowing what type it is, it also has the state of isShowing (open or not)

  const onClick = (rowIndex: number, columnIndex: number) => {
    console.log({ rowIndex });
  };

  const cellsArrayDefault: CellProps[][] = [
    [
      { cellType: 1, isShowing: true },
      { cellType: 2, isShowing: true },
      { cellType: 3, isShowing: true },
      { cellType: 4, isShowing: true },
      { cellType: 5, isShowing: true },
      { cellType: 6, isShowing: true },
      { cellType: "bomb", isShowing: true },
      { cellType: "bomb", isShowing: false },
    ],
  ];

  const [cellsArray, setCellsArray] = useState(cellsArrayDefault);

  return (
    <GameContext.Provider
      value={{ gridInfo: cellsArray, updateCell: () => onClick() }}
      //   value={{
      //     gridInfo: Array.from({ length: gridHeight }, () =>
      //       Array.from({ length: gridWidth }, () => null),
      //     ),
      //   }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
