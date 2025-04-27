// src/App.tsx
import { useReducer, useEffect, useState, useRef } from "react";
import classNames from "classnames";
import Card from "./components/card";
import GameOver from "./components/game-over";
import ThemeToggle from "./components/theme-toggle";
import ProgressCounter from "./components/progress-counter";
import Timer from "./components/timer";
import InfoButton from "./components/info-button";
import InfoModal from "./components/info-modal";
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import { ActionTypes } from "./types/gameTypes";
import {
  createShuffledDeck,
  preloadAudio,
  playCharacterAudio,
} from "./utils/gameUtils";
import { useIsMobile } from "./hooks/isMobile";
import MuteButton from "./components/mute-btn";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    gameOver,
    darkMode,
    audioElements,
  } = state;
  const [counterAnimation, setCounterAnimation] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const todayDateRef = useRef(new Date().toDateString());

  // Initialize game and set up theme
  useEffect(() => {
    // Initialize audio
    dispatch({
      type: ActionTypes.INIT_AUDIO,
      payload: { audioElements: preloadAudio() },
    });

    // Start the game
    startGame();

    // Check if the date has changed (for the daily challenge)
    const checkDateChange = () => {
      const currentDate = new Date().toDateString();
      if (currentDate !== todayDateRef.current) {
        todayDateRef.current = currentDate;
        // Reset the game if date changed
        startGame();
      }
    };

    // Set up a date change check
    const dateCheckInterval = setInterval(checkDateChange, 60000); // Check every minute

    // Cleanup audio on unmount
    return () => {
      Object.values(audioElements).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });

      // Clear timer on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      clearInterval(dateCheckInterval);
    };
  }, []);

  // Apply mute setting to all audio elements when it changes
  useEffect(() => {
    if (audioElements) {
      Object.values(audioElements).forEach((audio) => {
        audio.muted = isMuted;
      });
    }
  }, [isMuted, audioElements]);

  // Effect to check for game completion when matchedPairs changes
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length) {
      setTimeout(() => {
        // Show game over screen
        dispatch({
          type: ActionTypes.SET_GAME_OVER,
          payload: { gameOver: true },
        });

        // Stop the timer
        stopTimer();
      }, 1200); // 1.2 second delay
    }
  }, [matchedPairs, cards.length]);

  // Effect to handle two flipped cards
  useEffect(() => {
    if (flippedCards.length === 2) {
      // Get the two flipped cards
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.uniqueId === firstCardId);
      const secondCard = cards.find((card) => card.uniqueId === secondCardId);

      // Increment the move counter
      dispatch({ type: ActionTypes.INCREMENT_MOVES });

      // Check if the cards match
      if (firstCard && secondCard && firstCard.id === secondCard.id) {
        // Cards match - don't stop the audio for matches

        // Animate the counter
        setCounterAnimation(true);
        setTimeout(() => setCounterAnimation(false), 600);

        // Cards match - use a short delay to let the user see the match
        const matchTimer = setTimeout(() => {
          dispatch({
            type: ActionTypes.MATCH_CARDS,
            payload: { cardIds: [firstCardId, secondCardId] },
          });
        }, 300);

        return () => clearTimeout(matchTimer);
      } else {
        // Cards don't match, keep them visible for a while before flipping back
        // Stop audio for non-matches after a delay
        const nonMatchTimer = setTimeout(() => {
          // Stop the audio when cards don't match
          if (firstCard && secondCard) {
            Object.values(audioElements).forEach((audio) => {
              audio.pause();
              audio.currentTime = 0;
            });
          }

          dispatch({ type: ActionTypes.RESET_FLIPPED });
        }, 2000); // Longer delay to ensure user sees both cards

        return () => clearTimeout(nonMatchTimer);
      }
    }
  }, [flippedCards, cards, audioElements]);

  // Timer functions
  const startTimer = () => {
    if (!isTimerActive && !gameOver) {
      setIsTimerActive(true);

      // Clear any existing timer first
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Set up a new interval
      timerRef.current = setInterval(() => {
        setGameTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setGameTime(0);
  };

  // Handle card click
  const handleCardClick = (uniqueId: number) => {
    // Start the timer on first card click if it's not already running
    if (!isTimerActive && !gameOver) {
      startTimer();
    }

    // Don't allow clicks while evaluating a pair (when 2 cards are flipped)
    if (flippedCards.length === 2) {
      return;
    }

    // If the card is already flipped or matched, do nothing
    if (flippedCards.includes(uniqueId) || matchedPairs.includes(uniqueId)) {
      return;
    }

    // Find the card and play its sound
    const card = cards.find((card) => card.uniqueId === uniqueId);
    if (card) {
      playCharacterAudio(card.id, audioElements);
    }

    // Flip the card
    dispatch({
      type: ActionTypes.FLIP_CARD,
      payload: { cardId: uniqueId },
    });
  };

  // Handle game over dismissal
  const dismissGameOver = () => {
    dispatch({ type: ActionTypes.SET_GAME_OVER, payload: { gameOver: false } });
  };

  // Start or restart the game
  const startGame = () => {
    // For small screens, use fewer cards
    const cardCount = 6; // Set to desired number of unique characters per day
    const shuffledCards = createShuffledDeck(cardCount);
    dispatch({
      type: ActionTypes.START_GAME,
      payload: { cards: shuffledCards },
    });

    // Reset the timer (but don't start it until first card click)
    resetTimer();
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    dispatch({ type: ActionTypes.TOGGLE_DARK_MODE });
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle info modal
  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  return (
    <div
      className={classNames("min-h-screen", "p-4", {
        "bg-gray-900 text-white": darkMode,
        "bg-gray-100 text-gray-800": !darkMode,
      })}
    >
      <header className="flex flex-wrap items-center justify-between w-full mb-4 sm:mb-8 pt-2">
        {/* Stats in left section */}
        <div className="flex items-center gap-4 p-2">
          <div className="flex items-center gap-1 font-bold">
            <span className="text-3xl">🎮</span>
            <span>{moves}</span>
          </div>
          <Timer
            isActive={isTimerActive}
            seconds={gameTime}
            darkMode={darkMode}
          />
        </div>

        {/* Game Title in center section */}
        <div className="flex flex-col items-center">
          <h1
            className={classNames(
              "text-center",
              "text-3xl",
              "font-bold",
              "order-first w-full sm:order-none sm:w-auto",
              "mb-2 sm:mb-0",
              {
                "text-pink-300": darkMode,
                "text-pink-500": !darkMode,
                hidden: isMobile,
              }
            )}
          >
            Italian Brainrot Memory Game
          </h1>
        </div>

        {/* Controls in right section */}
        <div className="flex items-center gap-3 p-2">
          <InfoButton darkMode={darkMode} onClick={toggleInfoModal} />
          <MuteButton
            darkMode={darkMode}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mx-auto mb-6">
        <ProgressCounter
          matchedPairs={matchedPairs.length / 2}
          totalPairs={cards.length / 2}
          darkMode={darkMode}
          counterAnimation={counterAnimation}
        />
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full max-w-3xl mx-auto">
        {cards.map((card) => (
          <Card
            key={card.uniqueId}
            card={card}
            isFlipped={
              flippedCards.includes(card.uniqueId!) ||
              matchedPairs.includes(card.uniqueId!)
            }
            isMatched={matchedPairs.includes(card.uniqueId!)}
            onClick={() => handleCardClick(card.uniqueId!)}
            darkMode={darkMode}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
          <div className="z-10">
            <GameOver
              moves={moves}
              time={gameTime}
              onRestart={() => startGame()}
              onDismiss={dismissGameOver}
              darkMode={darkMode}
            />
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <InfoModal darkMode={darkMode} onClose={toggleInfoModal} />
      )}
    </div>
  );
}

export default App;
