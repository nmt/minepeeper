export type CellWithHidden = {
  cellType: CellType;
  hidden: boolean;
};

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
