import { Grid } from "./components/Grid";
import { Scorecard } from "./components/Scorecard";
import { GameContextProvider } from "./context/GameContext/GameContext";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <GameContextProvider>
          <div className="w-50 flex flex-nowrap justify-between">
            {/* Mines remaining */}
            <Scorecard value={3} />
            <button>:)</button>
            <Scorecard value={71} />
            {/* Timer */}
          </div>
          <Grid />
        </GameContextProvider>
      </div>
    </>
  );
}
