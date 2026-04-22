interface CellProps {
  cellType: "bomb" | "number" | "empty" | "flag";
  cellValue?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  isShowing: boolean;
}

// TODO: Implement onClick handler (Q: will the rerender cause FLOUT?)
// TODO: Implement styling

export default function Cell({ cellType, cellValue, isShowing }: CellProps) {
  const renderNumberCell = () => {
    if (cellValue) return <div className="cell">{cellValue}</div>;
  };

  if (isShowing) {
    switch (cellType) {
      case "bomb":
        return <div className="cell">💣</div>;
      case "number":
        return renderNumberCell();
      case "empty":
        return <div className="cell"> </div>;
      case "flag":
        return <div className="cell">🚩</div>;
    }
  } else {
    return <div className="hidden">{cellValue}</div>;
  }
}
