export type CellType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | -1 // bomb
  | 99 // flag
  | 999; // question

export const Cell = ({ cellType }: { cellType: CellType }) => {
  switch (cellType) {
    case 0:
      return <>⬜️</>;
    case 1:
      return <>1️⃣</>;
    case 2:
      return <>2️⃣</>;
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
    case -1:
      return <>💣</>;
    case 99:
      return <>🚩</>;
    case 999:
      return <>❓</>;
    default:
      return <></>;
  }
};
