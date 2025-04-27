import { FC } from "react";
import classNames from "classnames";

interface MuteButtonProps {
  darkMode: boolean;
  isMuted: boolean;
  toggleMute: () => void;
}

const MuteButton: FC<MuteButtonProps> = ({ darkMode, isMuted, toggleMute }) => {
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
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {/* Background pattern */}
      <div
        className={classNames("absolute inset-0 opacity-90 bg-gradient-to-br", {
          "from-purple-600 to-pink-700": darkMode,
          "from-purple-400 to-pink-500": !darkMode,
        })}
      >
        <div className="absolute inset-0"></div>
      </div>

      {/* Icon */}
      <div className="relative z-10 text-white">
        <span className="text-lg sm:text-2xl">{isMuted ? "🔇" : "🔊"}</span>
      </div>
    </button>
  );
};

export default MuteButton;
