type CellType =
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

export const cell = (cellType: CellType) => {
  switch (cellType) {
    case "empty":
      return "🟩";
    case "one":
      return "🐍";
    case "two":
      return "🍎";
    case "three":
      return "🧱";
    case "four":
      return "four";
    case "five":
      return "five";
    case "six":
      return "six";
    case "seven":
      return "seven";
    case "eight":
      return "eight";
    case "bomb":
      return "bomb";
    case "flag":
      return "flag";
    case "question":
      return "question";
  }
};
