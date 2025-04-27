// Character interface
export interface Character {
  id: string;
  name: string;
  image: string;
  sound: string;
  uniqueId?: number; // This will be added when creating pairs
}

// Game State
export interface GameState {
  cards: Character[];
  flippedCards: number[];
  matchedPairs: number[];
  moves: number;
  gameOver: boolean;
  darkMode: boolean;
  audioElements: { [key: string]: HTMLAudioElement };
  timerActive: boolean;
}

// Action Types
export enum ActionTypes {
  START_GAME = "START_GAME",
  FLIP_CARD = "FLIP_CARD",
  MATCH_CARDS = "MATCH_CARDS",
  RESET_FLIPPED = "RESET_FLIPPED",
  INCREMENT_MOVES = "INCREMENT_MOVES",
  SET_GAME_OVER = "SET_GAME_OVER",
  TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE",
  INIT_AUDIO = "INIT_AUDIO",
  SET_TIMER_ACTIVE = "SET_TIMER_ACTIVE",
}

// Action Interfaces
export type GameAction =
  | { type: ActionTypes.START_GAME; payload: { cards: Character[] } }
  | { type: ActionTypes.FLIP_CARD; payload: { cardId: number } }
  | { type: ActionTypes.MATCH_CARDS; payload: { cardIds: number[] } }
  | { type: ActionTypes.RESET_FLIPPED }
  | { type: ActionTypes.INCREMENT_MOVES }
  | { type: ActionTypes.SET_GAME_OVER; payload: { gameOver: boolean } }
  | { type: ActionTypes.TOGGLE_DARK_MODE }
  | {
      type: ActionTypes.INIT_AUDIO;
      payload: { audioElements: { [key: string]: HTMLAudioElement } };
    }
  | { type: ActionTypes.SET_TIMER_ACTIVE; payload: { active: boolean } };
