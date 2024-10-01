import { GameStatus } from "./GameContainer";
import { BombCount } from "./Toolbar/BombCount";
import { MrFace } from "./Toolbar/MrFace";
import { Timer } from "./Toolbar/Timer";

export const Toolbar = ({ gameStatus }: { gameStatus: GameStatus }) => {
  return (
    <>
      <BombCount />
      <MrFace status={gameStatus} />
      <Timer />
    </>
  );
};
