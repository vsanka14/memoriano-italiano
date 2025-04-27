// src/components/game-over.tsx
import React from "react";
import classNames from "classnames";
import {
  formatTime,
  getTodayDateString,
  getDailyGameNumber,
} from "../utils/gameUtils";
import ShareResults from "./share-results";

interface GameOverProps {
  moves: number;
  time: number;
  onRestart: () => void;
  onDismiss: () => void;
  darkMode: boolean;
}

const GameOver: React.FC<GameOverProps> = ({
  moves,
  time,
  onRestart,
  onDismiss,
  darkMode,
}) => {
  // Calculate a simple score (lower is better)
  const score = Math.round(moves * 10 + time / 2);

  return (
    <div
      className={classNames("p-6 rounded-xl shadow-lg max-w-md text-center", {
        "bg-gray-800 text-white": darkMode,
        "bg-white text-gray-800": !darkMode,
      })}
    >
      <h2
        className={classNames("text-2xl font-bold mb-6", {
          "text-pink-300": darkMode,
          "text-pink-500": !darkMode,
        })}
      >
        Bravo! You completed today's challenge!
      </h2>

      <div className="mb-6">
        <p className="text-sm mb-1">Daily Challenge #{getDailyGameNumber()}</p>
        <p className="text-sm mb-4">{getTodayDateString()}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div
            className={classNames("p-3 rounded-lg", {
              "bg-gray-700": darkMode,
              "bg-gray-200": !darkMode,
            })}
          >
            <div className="text-xl font-bold">{moves}</div>
            <div className="text-sm">Moves</div>
          </div>
          <div
            className={classNames("p-3 rounded-lg", {
              "bg-gray-700": darkMode,
              "bg-gray-200": !darkMode,
            })}
          >
            <div className="text-xl font-bold">{formatTime(time)}</div>
            <div className="text-sm">Time</div>
          </div>
        </div>

        <div
          className={classNames("p-3 rounded-lg mb-4", {
            "bg-gray-700": darkMode,
            "bg-gray-200": !darkMode,
          })}
        >
          <div className="text-2xl font-bold">{score}</div>
          <div className="text-sm">Final Score</div>
        </div>

        <div className="text-sm mb-4">
          Come back tomorrow for a new challenge!
        </div>

        {/* Share Results Section */}
        <div className="mb-6">
          <h3
            className={classNames("text-lg font-bold mb-2", {
              "text-gray-200": darkMode,
              "text-gray-700": !darkMode,
            })}
          >
            Share Your Results
          </h3>
          <ShareResults moves={moves} time={time} darkMode={darkMode} />
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onRestart}
          className={classNames("flex-1 py-2 px-4 rounded-lg font-medium", {
            "bg-pink-700 hover:bg-pink-600 text-white": darkMode,
            "bg-pink-500 hover:bg-pink-400 text-white": !darkMode,
          })}
        >
          Play Again
        </button>
        <button
          onClick={onDismiss}
          className={classNames("flex-1 py-2 px-4 rounded-lg font-medium", {
            "bg-gray-700 hover:bg-gray-600 text-white": darkMode,
            "bg-gray-300 hover:bg-gray-200 text-gray-700": !darkMode,
          })}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GameOver;
