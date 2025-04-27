import { FC } from "react";

interface MovesProps {
  moves: number;
}

const Moves: FC<MovesProps> = ({ moves }) => {
  return (
    <div className="flex items-center gap-1 font-bold">
      <span className="text-lg sm:text-4xl">🎮</span>
      <span>{moves}</span>
    </div>
  );
};

export default Moves;
