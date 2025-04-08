import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themes.ts';
import skillsReducer from './slices/skills.ts';
import sentimentApi from '../rtkQuery/SentimentAnalyzer.ts';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    skills: skillsReducer,
    [sentimentApi.reducerPath]: sentimentApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
    .concat(
      sentimentApi.middleware,
    ),
});