import { FC } from "react";
import classNames from "classnames";
import { Character } from "../types/gameTypes";

interface CardProps {
  card: Character;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  darkMode: boolean;
  isMobile?: boolean;
}

const Card: FC<CardProps> = ({
  card,
  isFlipped,
  isMatched,
  onClick,
  darkMode,
  isMobile,
}) => {
  return (
    <div
      className="w-full aspect-square sm:aspect-[4/5] perspective-1000 cursor-pointer relative"
      onClick={onClick}
    >
      <div
        className={classNames(
          "w-full h-full transition-transform duration-700 preserve-3d relative rounded-lg shadow-md",
          { "rotate-y-180": isFlipped },
          {
            "ring-2 ring-green-500 shadow-lg shadow-green-300/30": isMatched,
          }
        )}
      >
        {/* Front of card (question mark side) */}
        <div
          className={classNames(
            "w-full h-full absolute backface-hidden flex items-center justify-center rounded-lg text-white text-4xl font-bold",
            {
              "bg-gradient-to-br from-purple-900 to-purple-600": darkMode,
              "bg-gradient-to-br from-purple-700 to-purple-500": !darkMode,
            }
          )}
        >
          🧠
        </div>

        {/* Back of card (character side) */}
        <div className="w-full h-full absolute backface-hidden rotate-y-180 overflow-hidden rounded-lg">
          {/* Image container */}
          <div
            className={classNames("w-full h-full relative", {
              "blur-sm opacity-60": isMatched,
            })}
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name label with consistent styling */}
          <div
            className={classNames(
              "absolute bottom-0 left-0 w-full text-white text-md font-bold text-center p-1 transition-all duration-500 bg-rose-500",
              {
                "opacity-70": isMatched,
                hidden: isMobile,
              }
            )}
          >
            {card.name}
          </div>

          {/* Matched overlay */}
          {isMatched && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl">✅</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
