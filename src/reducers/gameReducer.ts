// src/reducers/gameReducer.ts
import { GameState, GameAction, ActionTypes } from "../types/gameTypes";

export const initialGameState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: [],
  moves: 0,
  gameOver: false,
  darkMode: true,
  audioElements: {},
  timerActive: false,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case ActionTypes.START_GAME:
      return {
        ...initialGameState,
        cards: action.payload.cards,
        darkMode: state.darkMode, // Preserve dark mode setting
        audioElements: state.audioElements, // Preserve audio elements
        timerActive: true, // Start the timer when the game starts
      };

    case ActionTypes.FLIP_CARD:
      // Don't flip if the card is already flipped or matched
      if (
        state.flippedCards.includes(action.payload.cardId) ||
        state.matchedPairs.includes(action.payload.cardId)
      ) {
        return state;
      }

      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload.cardId],
      };

    case ActionTypes.MATCH_CARDS:
      return {
        ...state,
        matchedPairs: [...state.matchedPairs, ...action.payload.cardIds],
        flippedCards: [],
      };

    case ActionTypes.RESET_FLIPPED:
      return {
        ...state,
        flippedCards: [],
        timerActive: false, // Stop the timer when cards are reset
      };

    case ActionTypes.INCREMENT_MOVES:
      return {
        ...state,
        moves: state.moves + 1,
      };

    case ActionTypes.SET_GAME_OVER:
      return {
        ...state,
        gameOver: action.payload.gameOver,
      };

    case ActionTypes.TOGGLE_DARK_MODE:
      const newDarkMode = !state.darkMode;

      // Update body class
      if (newDarkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }

      return {
        ...state,
        darkMode: newDarkMode,
      };

    case ActionTypes.INIT_AUDIO:
      return {
        ...state,
        audioElements: action.payload.audioElements,
      };

    default:
      return state;
  }
}
