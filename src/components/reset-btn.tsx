import { FC } from "react";
import classNames from "classnames";

interface ResetBtnProps {
  darkMode: boolean;
  startGame: () => void;
}

export const ResetBtn: FC<ResetBtnProps> = ({ darkMode, startGame }) => {
  return (
    <button
      className={classNames(
        "w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center",
        "transform hover:scale-110 transition-all duration-300",
        "shadow-lg border-2 relative overflow-hidden",
        {
          "border-pink-400": darkMode,
          "border-pink-500": !darkMode,
        }
      )}
      onClick={startGame}
      aria-label="Reset game"
      title="Reset game"
    >
      {/* Background pattern */}
      <div
        className={classNames("absolute inset-0 opacity-90 bg-gradient-to-br", {
          "from-blue-600 to-purple-700": darkMode,
          "from-blue-400 to-purple-500": !darkMode,
        })}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_70%)]"></div>
      </div>

      {/* Icon */}
      <div className="relative z-10">
        <span className="text-lg sm:text-2xl text-white">🔄</span>
      </div>
    </button>
  );
};

export default ResetBtn;
