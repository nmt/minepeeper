import { useState } from "react";
import { CellType } from "../../types";

const hiddenCellDisplay = "🔲";

const cellTypeToOutput = (cellType: CellType): string => {
  switch (cellType) {
    case 0:
      return "⬜️";
    case 1:
      return "1️⃣";
    case 2:
      return "2️⃣";
    case 3:
      return "3️⃣";
    case 4:
      return "4️⃣";
    case 5:
      return "5️⃣";
    case 6:
      return "6️⃣";
    case 7:
      return "7️⃣";
    case 8:
      return "8️⃣";
    case -1:
      return "💣";
    case 99:
      return "🚩";
    case 999:
      return "❓";
    default:
      return "";
  }
};

export const Cell = ({
  cellType,
  hiddenFromProps,
  onClick,
  onCellMouseUp,
}: {
  cellType: CellType;
  hiddenFromProps: boolean;
  onClick: () => void;
  onCellMouseUp: (
    clickedCell: CellType,
    hidden: boolean,
    setHidden: any
  ) => void;
}) => {
  const [hidden, setHidden] = useState(hiddenFromProps);

  return (
    <span
      onMouseDown={onClick}
      onMouseUp={() => onCellMouseUp(cellType, hidden, setHidden)}
    >
      {hidden ? hiddenCellDisplay : cellTypeToOutput(cellType)}
    </span>
  );
};
