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
  const shareMessage = `🇮🇹 Italian Brainrot Memory #${getDailyGameNumber()} (${getTodayDateString()})
⏱️ Time: ${formatTime(time)}
🎮 Moves: ${moves}
🏆 Score: ${score}
${getScoreEmojis()}

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
          "p-4 rounded-lg mb-4 font-mono text-sm whitespace-pre-wrap",
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

      {/* Social Share Buttons (optional) */}
      <div className="mt-4 flex justify-center gap-3">
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
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"></path>
            <path
              d="M20.52 3.449C12.831-3.68.521 1.562.022 11.766c-.173 3.535 1.424 7.06 4.053 9.582l-2.891 5.198c-.285.41.156.905.611.75l5.935-2.018c2.345 1.361 5.03 2.118 7.835 2.148 9.756.117 14.845-11.421 5.964-20.097zm-8.512 21.483c-2.345-.09-4.639-.662-6.682-1.68l-.467-.225-4.643 1.592 1.225-4.177-.248-.435a11.633 11.633 0 01-2.285-6.844c-.262-8.553 8.51-14.178 15.617-9.58 5.079 3.307 5.842 10.55 1.756 15.17-2.16 2.467-5.29 3.825-8.575 3.694z"
              fillRule="nonzero"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShareResults;
