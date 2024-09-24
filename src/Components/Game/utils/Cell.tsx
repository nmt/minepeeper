export type CellType =
  | "empty"
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "bomb"
  | "flag"
  | "question";

export const Cell = ({ cellType }: { cellType: string }) => {
  switch (cellType) {
    case "empty":
      return <>⬜️</>;
    case "one":
      return <>1️⃣</>;
    case "two":
      return <>2️⃣ </>;
    case "three":
      return <>3️⃣</>;
    case "four":
      return <>4️⃣</>;
    case "five":
      return <>5️⃣</>;
    case "six":
      return <>6️⃣</>;
    case "seven":
      return <>7️⃣</>;
    case "eight":
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
