// src/components/game-over.tsx
import React from "react";
import classNames from "classnames";
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
  return (
    <div
      className={classNames(
        "p-4 sm:p-6 rounded-xl shadow-lg max-w-md w-full mx-auto text-center",
        {
          "bg-gray-800 text-white": darkMode,
          "bg-white text-gray-800": !darkMode,
        }
      )}
    >
      <h2
        className={classNames("text-xl sm:text-2xl font-bold mb-4", {
          "text-pink-300": darkMode,
          "text-pink-500": !darkMode,
        })}
      >
        Bravo! You completed today's challenge!
      </h2>

      <div className="text-sm mb-4">
        Come back tomorrow for a new challenge!
      </div>

      {/* Share Results Section */}
      <div className="mb-4">
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
