// src/components/info-button.tsx
import { FC } from "react";
import classNames from "classnames";

interface InfoButtonProps {
  darkMode: boolean;
  onClick: () => void;
}

const InfoButton: FC<InfoButtonProps> = ({ darkMode, onClick }) => {
  return (
    <button
      className={classNames(
        "w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center",
        "transform hover:scale-110 transition-all duration-300",
        "shadow-lg border-2 relative overflow-hidden",
        {
          "border-blue-400": darkMode,
          "border-blue-500": !darkMode,
        }
      )}
      onClick={onClick}
      aria-label="Game Information"
      title="About This Game"
    >
      {/* Background pattern */}
      <div
        className={classNames("absolute inset-0 opacity-90 bg-gradient-to-br", {
          "from-blue-600 to-indigo-700": darkMode,
          "from-blue-400 to-indigo-500": !darkMode,
        })}
      >
        <div className="absolute inset-0"></div>
      </div>

      {/* Icon */}
      <div className="relative z-10 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-lg sm:text-2xl"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
    </button>
  );
};

export default InfoButton;
