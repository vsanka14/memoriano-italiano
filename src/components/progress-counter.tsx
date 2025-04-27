// src/components/ProgressCounter.tsx
import { FC, useEffect, useState } from "react";
import classNames from "classnames";

interface ProgressCounterProps {
  matchedPairs: number;
  totalPairs: number;
  darkMode: boolean;
  counterAnimation: boolean;
}

const ProgressCounter: FC<ProgressCounterProps> = ({
  matchedPairs,
  totalPairs,
  darkMode,
  counterAnimation,
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const progressPercent =
    totalPairs !== 0 ? (matchedPairs / totalPairs) * 100 : 0;
  const progressWidth = `${progressPercent}%`;
  const isComplete = matchedPairs === totalPairs && totalPairs > 0;

  // Show celebration emoji when game is completed
  useEffect(() => {
    if (isComplete) {
      setShowCelebration(true);
    } else {
      setShowCelebration(false);
    }
  }, [isComplete]);

  // Determine gradient colors based on progress
  const getProgressGradient = () => {
    if (progressPercent <= 0) return "from-blue-500 to-blue-500";
    if (progressPercent <= 20) return "from-blue-500 via-cyan-500 to-teal-500";
    if (progressPercent <= 40)
      return "from-blue-500 via-green-500 to-yellow-500";
    if (progressPercent <= 60)
      return "from-green-500 via-yellow-500 to-orange-500";
    if (progressPercent <= 80)
      return "from-yellow-500 via-orange-500 to-red-500";
    if (progressPercent < 100) return "from-orange-500 via-red-500 to-pink-500";
    return "from-red-500 via-pink-500 to-purple-500";
  };

  return (
    <div className="w-full flex flex-col items-center transition-all duration-300">
      <div
        className={classNames(
          "relative w-full h-10 rounded-full overflow-hidden shadow-inner",
          { "bg-gray-800": darkMode, "bg-gray-300": !darkMode }
        )}
      >
        <div
          className={classNames(
            "h-full rounded-full transition-all duration-700 ease-in-out bg-gradient-to-r",
            getProgressGradient()
          )}
          style={{
            width: progressWidth,
            boxShadow: isComplete
              ? "0 0 10px rgba(255, 255, 255, 0.7)"
              : "none",
          }}
        ></div>

        <div
          className={classNames(
            "absolute inset-0 flex items-center justify-center text-sm font-bold",
            {
              "text-white": darkMode || progressPercent > 40,
              "text-gray-800": !darkMode && progressPercent <= 40,
              "animate-pulse": counterAnimation,
            }
          )}
        >
          <span className="flex items-center">
            Pairs: {matchedPairs}/{totalPairs}
            {showCelebration && (
              <span className="ml-2 text-lg animate-bounce">🎉</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCounter;
