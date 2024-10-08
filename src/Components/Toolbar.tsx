import { GameStatus } from "./GameContainer";
import { BombCount } from "./Toolbar/BombCount";
import { MrFace } from "./Toolbar/MrFace";
import { Timer } from "./Toolbar/Timer";

export const Toolbar = ({
  bombCount,
  gameStatus,
}: {
  bombCount: number;
  gameStatus: GameStatus;
}) => {
  return (
    <>
      <BombCount bombCount={bombCount} />
      <MrFace status={gameStatus} />
      <Timer />
    </>
  );
};
