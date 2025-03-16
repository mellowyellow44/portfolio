import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themes.ts';
import skillsReducer from './slices/skills.ts';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    skills: skillsReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
    .concat(
    //   rtk api middleware goes here
    ),
});