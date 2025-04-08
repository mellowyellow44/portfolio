import React, { useEffect, useState } from "react";
import { useAnalyzeSentimentMutation } from "../../rtkQuery/SentimentAnalyzer.ts";
import _ from "lodash";

const SentimentAnalyzer = () => {
  const [text, setText] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  // RTK Query hook for sentiment analysis
  const [analyzeSentiment, { data: sentiment, isLoading, isError, error }] =
    useAnalyzeSentimentMutation();

  // Debounced analysis function with increased debounce time (1000ms)
  useEffect(() => {
    const debouncedAnalyze = _.debounce(async (inputText) => {
      if (inputText.trim()) {
        await analyzeSentiment(inputText);
      }
    }, 1000); // Increased from 500ms to 1000ms

    if (text) {
      debouncedAnalyze(text);
    }

    return () => {
      debouncedAnalyze.cancel();
    };
  }, [text, analyzeSentiment]);

  // Calculate sentiment meter position (0-100)
  const meterPosition = sentiment ? ((sentiment.score ?? 0) + 1) / 2 * 100 : 50;

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Sentiment Analyzer
      </h1>

      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter some text to analyze sentiment..."
          value={text}
          onChange={(e: any) => setText(e.target.value)}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-red-500 font-medium">Negative</span>
          <span className="text-blue-500 font-medium">Neutral</span>
          <span className="text-green-500 font-medium">Positive</span>
        </div>

        <div className="relative h-6 bg-gradient-to-r from-red-400 via-blue-300 to-green-400 rounded-full mb-2">
          {/* Sentiment meter indicator */}
          <div
            className="absolute top-0 transform -translate-x-1/2 w-4 h-8 bg-gray-800 rounded-full border-2 border-white"
            style={{
              left: `${meterPosition}%`,
              transition: "left 0.5s ease-out",
            }}
          />
        </div>

        <div className="mt-4 flex flex-col items-center">
          <div className="text-lg font-bold mb-1">
            {isLoading
              ? <span className="text-gray-500">Analyzing...</span>
              : isError
              ? <span className="text-red-600">Error analyzing text</span>
              : sentiment
              ? (
                <span
                  className={sentiment.label.includes("Positive")
                    ? "text-green-600"
                    : sentiment.label.includes("Negative")
                    ? "text-red-600"
                    : "text-blue-600"}
                >
                  {sentiment.label}
                </span>
              )
              : <span className="text-gray-500">Enter text to analyze</span>}
          </div>

          {sentiment && (
            <div className="text-sm text-gray-600">
              Confidence: {(sentiment.confidence ?? 0).toFixed(1)}%
            </div>
          )}

          {isError && (
            <div className="text-sm text-red-600 mt-1">
              {error instanceof Error
                ? error.message
                : "Failed to analyze text"}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          onClick={() => setShowExplanation(!showExplanation)}
        >
          {showExplanation ? "Hide explanation" : "How it works"}
          <svg
            className={`ml-1 w-4 h-4 transform ${
              showExplanation ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showExplanation && (
          <div className="mt-3 text-sm bg-blue-50 p-4 rounded">
            <h3 className="font-medium mb-2">
              How the Sentiment Analysis Works:
            </h3>

            <ol className="list-decimal pl-5 space-y-1">
              <li>Your text is sent to a Deno/Oak backend server</li>
              <li>The server forwards your text to the HuggingFace Inference API</li>
              <li>HuggingFace processes your text using a fine-tuned DistilBERT model</li>
              <li>The model outputs sentiment predictions with confidence scores</li>
              <li>Results are normalized and returned to your browser</li>
            </ol>

            <div className="mt-3 p-3 bg-blue-100 rounded">
              <p>
                This integration uses:
              </p>
              <ul className="list-disc pl-5 mt-1">
                <li>Deno with Oak for the lightweight API server</li>
                <li>HuggingFace's AI models for advanced sentiment analysis</li>
                <li>Redux Toolkit Query for efficient API management</li>
                <li>React for the interactive user interface</li>
              </ul>
            </div>
            
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700">
              <p className="font-medium">Try these examples:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>"I love this product, it's absolutely amazing!"</li>
                <li>"I had a terrible experience and am very disappointed."</li>
                <li>"The weather today is partly cloudy with a chance of rain."</li>
                <li>"I felt sick all day, but the sunset was beautiful."</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalyzer;