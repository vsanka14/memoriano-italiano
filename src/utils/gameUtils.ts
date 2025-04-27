// src/utils/gameUtils.ts
import { Character } from "../types/gameTypes";
import { characters } from "../data/characters";

/**
 * Shuffles an array using the Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Gets the daily seed based on the current date
 * This ensures all players get the same characters on a given day
 */
export function getDailySeed(): number {
  const today = new Date();
  return (
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  );
}

/**
 * Get deterministic "random" number based on seed
 * This is a simple pseudo-random number generator
 */
function seededRandom(seed: number): () => number {
  let currentSeed = seed;
  return function () {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
}

/**
 * Shuffles an array using a seed for consistent results
 */
export function seededShuffle<T>(array: T[], seed: number): T[] {
  const newArray = [...array];
  const random = seededRandom(seed);

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Selects daily characters deterministically based on the date
 * @param characterCount The number of unique characters to include (default: 6)
 */
export function getDailyCharacters(characterCount: number = 6): Character[] {
  const seed = getDailySeed();
  // First shuffle all characters deterministically using the seed
  const shuffledCharacters = seededShuffle([...characters], seed);
  // Take the first n characters for today's game
  return shuffledCharacters.slice(0, characterCount);
}

/**
 * Creates a deck with the daily characters, with pairs for each character
 * The positions are randomly shuffled for each player
 */
export function createShuffledDeck(characterCount: number = 6): Character[] {
  // Get today's characters (deterministic for all players)
  const dailyCharacters = getDailyCharacters(characterCount);

  // Create pairs of cards (each character appears twice)
  const cardPairs = [...dailyCharacters, ...dailyCharacters].map(
    (card, index) => ({
      ...card,
      uniqueId: index, // Add a unique id for each card instance
    })
  );

  // Shuffle card positions randomly (different for each player)
  return shuffleArray(cardPairs);
}

/**
 * Preload audio files for all characters
 */
export function preloadAudio(): { [key: string]: HTMLAudioElement } {
  const audios: { [key: string]: HTMLAudioElement } = {};
  characters.forEach((character) => {
    const audio = new Audio(character.sound);
    audio.preload = "auto";
    audios[character.id] = audio;
  });
  return audios;
}

/**
 * Stop all currently playing audio
 */
export function stopAllAudio(audioElements: {
  [key: string]: HTMLAudioElement;
}): void {
  Object.values(audioElements).forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

/**
 * Play audio for a specific character
 */
export function playCharacterAudio(
  characterId: string,
  audioElements: { [key: string]: HTMLAudioElement },
  stopTimeout = 10000
): void {
  if (audioElements[characterId]) {
    // First stop all audio
    stopAllAudio(audioElements);
    // Play the sound
    audioElements[characterId].play();
    // Stop after timeout
    setTimeout(() => {
      if (audioElements[characterId]) {
        audioElements[characterId].pause();
        audioElements[characterId].currentTime = 0;
      }
    }, stopTimeout);
  }
}

/**
 * Format seconds as MM:SS
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Generate today's date string in format: April 26, 2025
 */
export function getTodayDateString(): string {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get game number (similar to Wordle #578)
 * Counts days since January 1, 2025 (or any start date you choose)
 */
export function getDailyGameNumber(): number {
  const startDate = new Date(2025, 3, 26); // January 1, 2025
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
}
