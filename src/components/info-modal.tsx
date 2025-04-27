// src/components/info-modal.tsx
import React from "react";
import classNames from "classnames";
import { getTodayDateString, getDailyGameNumber } from "../utils/gameUtils";

interface InfoModalProps {
  darkMode: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ darkMode, onClose }) => {
  const todayDateString = getTodayDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      ></div>
      <div
        className={classNames(
          "z-10 p-6 rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto",
          {
            "bg-gray-800 text-white": darkMode,
            "bg-white text-gray-800": !darkMode,
          }
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={classNames("text-2xl font-bold", {
              "text-pink-300": darkMode,
              "text-pink-500": !darkMode,
            })}
          >
            About This Game
          </h2>
          <button
            onClick={onClose}
            className={classNames(
              "text-2xl hover:opacity-70 transition-opacity",
              {
                "text-gray-300": darkMode,
                "text-gray-500": !darkMode,
              }
            )}
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <p>
            <strong>Italian Brainrot Memory Game</strong> is a daily challenge
            memory game featuring silly Italian-sounding characters.
          </p>

          <p>
            <strong>Today:</strong> {todayDateString} (Game #
            {getDailyGameNumber()})
          </p>

          <p>
            <strong>How to Play:</strong> Flip cards to find matching pairs and
            hear the characters' silly voices. The game ends when all pairs are
            matched.
          </p>

          <p>
            <strong>Daily Challenge:</strong> Just like Wordle, everyone gets
            the same set of characters each day, but their positions will be
            different for each player.
          </p>

          <p>
            <strong>Scoring:</strong> Try to complete the game in as few moves
            and as little time as possible!
          </p>

          <div
            className={classNames("text-sm italic mt-6", {
              "text-gray-400": darkMode,
              "text-gray-500": !darkMode,
            })}
          >
            Created with ♥ by beans4breakfast
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
