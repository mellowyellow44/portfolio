import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themes.ts';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // [evidenceApi.reducerPath]: evidenceApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
    .concat(
    //   evidenceApi.middleware,
    ),
});