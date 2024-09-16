export const MrFace = ({ status }: { status: string }) => {
  let face;
  switch (status) {
    case "alive":
      face = "😀";
      break;
    case "clicking":
      face = "😲";
      break;
    case "win":
      face = "😎";
      break;
    case "lose":
      face = "😵";
      break;
    default:
      face = "🤔";
  }
  return <>{face}</>;
};
