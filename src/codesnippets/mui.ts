export const themeCodeSnippet =
    `// Theme configuration with dynamic mode switching
  const theme = createTheme({
    palette: {
      mode: reduxTheme?.palette?.mode || 'light',
      primary: {
        main: reduxTheme?.palette?.primary?.main || '#1976d2',
      },
      secondary: {
        main: reduxTheme?.palette?.secondary?.main || '#dc004e',
      },
    },
    typography: {
      fontFamily: reduxTheme?.typography?.fontFamily ||
        '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: reduxTheme?.typography?.h1?.fontWeight || 500,
      },
    },
  });
  
  // ThemeToggleSwitch component that toggles between light and dark mode using Redux
  import React from "react";
  import { IconButton } from "@mui/material";
  import LightModeIcon from "@mui/icons-material/LightMode";
  import DarkModeIcon from "@mui/icons-material/DarkMode";
  import { toggleThemeMode } from "../redux/slices/themes.ts";
  import { useDispatch, useSelector } from "react-redux";
  
  const ThemeToggleSwitch = () => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state: any) => state.theme.palette);
  
    const handleToggleTheme = () =>
      dispatch(toggleThemeMode(mode === "light" ? "dark" : "light"));
  
    return (
      <IconButton onClick={handleToggleTheme}>
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    );
  };
  
  export default ThemeToggleSwitch;`;
