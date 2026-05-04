import Cell from "./components/Cell";

export default function Home() {
  // TODO: Implement ErrorBoundary
  return (
    // TODO: Use Grid component
    // TODO: Generate the grid
    // TODO: Calculate empty spaces in a Reacty way
    // TODO: State management of Cells
    // TODO: Implement tests
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Cell cellType={1} isShowing={true} />
      <Cell cellType={2} isShowing={true} />
      <Cell cellType={3} isShowing={true} />
      <Cell cellType={4} isShowing={true} />
      <Cell cellType={5} isShowing={true} />
      <Cell cellType={6} isShowing={true} />
      <Cell cellType="bomb" isShowing={true} />
      <Cell cellType="bomb" isShowing={false} />
    </div>
  );
}
