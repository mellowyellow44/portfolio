import React from 'react';
import SentimentAnalyzer from './SentimentAnalyzer.tsx'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            AI Sentiment Analysis
          </h1>
          <p className="text-gray-600 mt-2">
            Powered by HuggingFace, Deno, and Redux Toolkit
          </p>
        </header>
        
        <main>
          <SentimentAnalyzer />
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Deno and React • Using HuggingFace's DistilBERT model</p>
          <p className="mt-1">
            <a 
              href="https://github.com/huggingface/transformers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Learn more about transformer models
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;