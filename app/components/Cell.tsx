"use client";

import clsx from "clsx";

export interface CellProps {
  cellType: "bomb" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0;
  isFlagged: boolean;
  isShowing: boolean;
  onClick?: () => void;
  onRightClick?: () => void;
}

// TODO: Obfuscate cell value

export default function Cell({
  cellType,
  isFlagged = false,
  isShowing = false,
  onClick,
  onRightClick,
}: CellProps) {
  const cellClasses = {
    cell: true,
    "is-flagged": isFlagged,
    "is-showing": isShowing,
  };

  const renderCellValue = () => {
    if (!isShowing && isFlagged) {
      return "🚩";
    }
    if (!isShowing) {
      return "🔲";
    }
    switch (cellType) {
      case "bomb":
        return "💣";
      case 0:
        return " ";
      default:
        return cellType;
    }
  };

  // TODO: Add tests for handling left/right click
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isShowing) {
      onClick?.();
    }
  };

  return (
    <div
      className={clsx(cellClasses)}
      onClick={onClickHandler}
      onContextMenu={onRightClick}
    >
      {renderCellValue()}
    </div>
  );
}
