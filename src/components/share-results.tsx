// src/components/share-results.tsx
import React, { useState } from "react";
import classNames from "classnames";
import {
  formatTime,
  getTodayDateString,
  getDailyGameNumber,
} from "../utils/gameUtils";

interface ShareResultsProps {
  moves: number;
  time: number;
  darkMode: boolean;
}

const ShareResults: React.FC<ShareResultsProps> = ({
  moves,
  time,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);

  // Calculate score
  const score = Math.round(moves * 10 + time / 2);

  // Generate emoji stars based on score (just for fun)
  const getScoreEmojis = () => {
    if (score < 100) return "⭐⭐⭐⭐⭐";
    if (score < 150) return "⭐⭐⭐⭐";
    if (score < 200) return "⭐⭐⭐";
    if (score < 250) return "⭐⭐";
    return "⭐";
  };

  // Create shareable message
  const shareMessage = `🇮🇹 Memoriano Italiano #${getDailyGameNumber()} (${getTodayDateString()})
⏱️ Time: ${formatTime(time)}
🎮 Moves: ${moves}
🏆 Score: ${getScoreEmojis()}

Play today's challenge: ${window.location.href}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full">
      <div
        className={classNames(
          "p-3 rounded-lg mb-3 font-mono text-xs sm:text-sm whitespace-pre-wrap text-left",
          {
            "bg-gray-700 text-white": darkMode,
            "bg-gray-200 text-gray-800": !darkMode,
          }
        )}
      >
        {shareMessage}
      </div>

      <button
        onClick={copyToClipboard}
        className={classNames(
          "w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors",
          {
            "bg-green-600 text-white": copied,
            "bg-blue-600 hover:bg-blue-500 text-white": !copied && darkMode,
            "bg-blue-500 hover:bg-blue-400 text-white": !copied && !darkMode,
          }
        )}
      >
        {copied ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
            Copy to Clipboard
          </>
        )}
      </button>

      {/* Social Share Buttons */}
      <div className="mt-3 flex justify-center gap-2">
        {/* Twitter */}
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareMessage
              )}`,
              "_blank"
            )
          }
          className={classNames("p-2 rounded-full transition-colors", {
            "bg-gray-700 hover:bg-gray-600 text-blue-400": darkMode,
            "bg-gray-200 hover:bg-gray-300 text-blue-500": !darkMode,
          })}
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}&quote=${encodeURIComponent(shareMessage)}`,
              "_blank"
            )
          }
          className={classNames("p-2 rounded-full transition-colors", {
            "bg-gray-700 hover:bg-gray-600 text-blue-600": darkMode,
            "bg-gray-200 hover:bg-gray-300 text-blue-800": !darkMode,
          })}
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </button>

        {/* WhatsApp - Fixed icon */}
        <button
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?text=${encodeURIComponent(
                shareMessage
              )}`,
              "_blank"
            )
          }
          className={classNames("p-2 rounded-full transition-colors", {
            "bg-gray-700 hover:bg-gray-600 text-green-500": darkMode,
            "bg-gray-200 hover:bg-gray-300 text-green-600": !darkMode,
          })}
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShareResults;
