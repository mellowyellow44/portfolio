import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
}

const initialState: ThemeState = {
 primaryColor: '#000000',
 secondaryColor: '#ffffff',
};

const themeSlice = createSlice({  
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<ThemeState>) => {
      const currentTheme = action.payload;
      const newTheme = {
        ...currentTheme,
        ...action.payload,
      };
      return newTheme;
    }
  },
});

export const { 
  updateTheme
} = themeSlice.actions;

export default themeSlice.reducer;