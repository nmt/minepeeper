import { Grid } from "./components/Grid";
import { GameContextProvider } from "./context/GameContext";

export default function Home() {
  // TODO: Implement ErrorBoundary
  return (
    // TODO: Use Grid component
    // TODO: Generate the grid
    // TODO: Calculate empty spaces in a Reacty way
    // TODO: State management of Cells
    // TODO: Implement tests
    <>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold">Hello World</h1>

        <GameContextProvider>
          <Grid />
        </GameContextProvider>
      </div>
    </>
  );
}
