export type CellType =
  | "empty"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | "bomb"
  | "flag"
  | "question";

export const Cell = ({ cellType }: { cellType: CellType }) => {
  switch (cellType) {
    case "empty":
      return <>⬜️</>;
    case 1:
      return <>1️⃣</>;
    case 2:
      return <>2️⃣ </>;
    case 3:
      return <>3️⃣</>;
    case 4:
      return <>4️⃣</>;
    case 5:
      return <>5️⃣</>;
    case 6:
      return <>6️⃣</>;
    case 7:
      return <>7️⃣</>;
    case 8:
      return <>8️⃣</>;
    case "bomb":
      return <>💣</>;
    case "flag":
      return <>🚩</>;
    case "question":
      return <>❓</>;
    default:
      return <></>;
  }
};
