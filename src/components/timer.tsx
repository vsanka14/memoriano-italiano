// src/components/Timer.tsx
import { FC } from "react";

interface TimerProps {
  isActive: boolean;
  seconds: number;
  darkMode: boolean;
}

const Timer: FC<TimerProps> = ({ seconds, darkMode }) => {
  // Format seconds to mm:ss
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-1">
      <div className="text-3xl sm:text-4xl">⏱️</div>
      <div
        className={`text-base font-bold font-mono ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default Timer;
