"use client";

import clsx from "clsx";
import { useState } from "react";

interface CellProps {
  cellType: "bomb" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "empty" | "flag";
  isShowing: boolean;
}

// TODO: Implement styling
// TODO: Obfuscate cell value

export default function Cell({ cellType }: CellProps) {
  const [isShowing, setIsShowing] = useState(false);

  const cellClasses = {
    cell: true,
    "is-showing": isShowing,
  };

  const renderCellValue = () => {
    if (!isShowing) {
      return "🔲";
    }
    switch (cellType) {
      case "bomb":
        return "💣";
      case "empty":
        return " ";
      case "flag":
        return "🚩";
      default:
        return cellType;
    }
  };

  const onClickHandler = () => {
    if (!isShowing) {
      setIsShowing(true);
    }
  };

  return (
    <div className={clsx(cellClasses)} onClick={onClickHandler}>
      {renderCellValue()}
    </div>
  );
}
