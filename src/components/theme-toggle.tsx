import { FC } from "react";
import classNames from "classnames";

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      className={classNames(
        "w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center",
        "transform hover:scale-110 transition-all duration-300",
        "shadow-lg border-2 relative overflow-hidden",
        {
          "border-yellow-300": darkMode,
          "border-indigo-400": !darkMode,
        }
      )}
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background with transition */}
      <div
        className={classNames(
          "absolute inset-0 opacity-90 transition-colors duration-500",
          {
            "bg-gradient-to-br from-orange-400 to-yellow-600": darkMode,
            "bg-gradient-to-br from-indigo-400 to-blue-600": !darkMode,
          }
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_70%)]"></div>
      </div>

      {/* Sun icon (visible in dark mode) */}
      <div
        className={classNames(
          "absolute inset-0 flex items-center justify-center transition-all duration-500",
          {
            "opacity-100 transform rotate-0": darkMode,
            "opacity-0 transform rotate-90": !darkMode,
          }
        )}
      >
        <span className="text-2xl text-white">☀️</span>
      </div>

      {/* Moon icon (visible in light mode) */}
      <div
        className={classNames(
          "absolute inset-0 flex items-center justify-center transition-all duration-500",
          {
            "opacity-0 transform -rotate-90": darkMode,
            "opacity-100 transform rotate-0": !darkMode,
          }
        )}
      >
        <span className="text-2xl text-white">🌙</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
