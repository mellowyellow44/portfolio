import { BrowserRouter as Router, Navigate, Route, Routes, } from "react-router-dom";

import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home/layout.tsx";
import Skills from "./pages/Skills/layout.tsx";
import MuiSkills from "./pages/Skills/MuiSkills.tsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSelector } from "react-redux";

const RoutesIndex: React.FC = () => {

  const reduxTheme = useSelector((state: any) => state.theme);

  const theme = createTheme({
    ...reduxTheme,
    palette: {
      ...(reduxTheme?.palette?.mode && { mode: reduxTheme.palette.mode }),
      ...(reduxTheme?.palette?.primary && { primary: reduxTheme.palette.primary }),
      ...(reduxTheme?.palette?.secondary && { secondary: reduxTheme.palette.secondary }),
    },
    typography: {
      ...(reduxTheme?.typography && { ...reduxTheme.typography }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <Router>

        <NavBar />

        <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/skills"
              element={<Skills />}
            />

            <Route
              path="/skills/mui"
              element={<MuiSkills />}
            />

            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>

        </Router>
      </LocalizationProvider>
    </ThemeProvider >
  );
};

export default RoutesIndex;
