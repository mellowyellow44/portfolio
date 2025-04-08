// src/api/sentimentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define response types
export interface SentimentResponse {
  score: number;
  label: string;
  confidence: number;
}

// Define the sentiment analysis API
export const sentimentApi = createApi({
  reducerPath: 'sentimentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    analyzeSentiment: builder.mutation<SentimentResponse, string>({
      query: (text) => ({
        url: '/analyze-sentiment',
        method: 'POST',
        body: { text }
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useAnalyzeSentimentMutation } = sentimentApi;

export default sentimentApi;