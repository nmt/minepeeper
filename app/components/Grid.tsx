import { ReactNode } from "react";

// TODO: CSS Grid for styling
export const Grid = (cellsArray: ReactNode[][]) => {
  return (
    <div className="grid">
      {cellsArray.map((cellRow, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {cellRow.map((cellColumn, columnIndex) => (
            <div className="grid-cell" key={columnIndex}>
              {cellColumn}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
