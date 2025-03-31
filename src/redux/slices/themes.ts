import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import muiLightTheme from '../../styles/mui/themes/lightTheme.ts';

interface ThemeState {
  palette: {
    mode: string;
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
  };
  typography: {
    fontFamily: string;
    h1: {
      fontWeight: number;
    };
  };
}

const initialState: ThemeState = {
  ...muiLightTheme,
}

const themeSlice = createSlice({  
  name: 'theme',
  initialState,

    reducers: {
      toggleThemeMode: (state, action) => {
        state.palette.mode = action.payload;
      },
      setPrimaryColor: (state, action: PayloadAction<string>) => {
        state.palette.primary.main = action.payload;
      },
      setSecondaryColor: (state, action: PayloadAction<string>) => {
        state.palette.secondary.main = action.payload;
      },
    },
  });

export const { 
  toggleThemeMode, 
  setPrimaryColor, 
  setSecondaryColor
} = themeSlice.actions;

export default themeSlice.reducer;