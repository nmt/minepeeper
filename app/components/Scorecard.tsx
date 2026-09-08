export interface ScorecardProps {
  value: number;
}

const zeroPad = (num: number) => String(num).padStart(3, "0");

export const Scorecard = ({ value }: ScorecardProps) => {
  return (
    <div className="font-micro text-3xl text-red-500 bg-black px-3">
      {zeroPad(value)}
    </div>
  );
};
