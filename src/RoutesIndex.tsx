import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, } from "react-router-dom";
import StylishLoader from "./components/StylishLoader.tsx";

import NavBar from "./components/NavBar.tsx";
// Lazy load components instead of importing directly
const Home = lazy(() => import("./pages/Home/layout.tsx"));
const Skills = lazy(() => import("./pages/Skills/SkillsLayout.tsx"));
const Resume = lazy(() => import("./pages/Resume/Layout.tsx"));
const Demos = lazy(() => import("./demos/layout.tsx"));
const SkillsOverView = lazy(() => import("./pages/Skills/SkillsOverview.tsx"));
const TailWindFrequencies = lazy(() => import("./demos/TailwindFrequencies.tsx") );
const RechartsMouseEventDataViz = lazy(() => import("./demos/RechartsMouseEventDataViz.tsx") );
const ChatDemo = lazy(() => import("./demos/Chat.tsx") );
const SentimentAnalysis = lazy(() => import("./demos/Sentiment/Layout.tsx") );

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";

const RoutesIndex: React.FC = () => {
  const reduxTheme = useSelector((state: any) => state.theme);

  const theme = createTheme({
    ...reduxTheme,
    palette: {
      ...(reduxTheme?.palette?.mode && { mode: reduxTheme.palette.mode }),
      ...(reduxTheme?.palette?.primary &&
        { primary: reduxTheme.palette.primary }),
      ...(reduxTheme?.palette?.secondary &&
        { secondary: reduxTheme.palette.secondary }),
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
          {/* Add Suspense with a fallback UI while components are loading */}
          <Suspense fallback={<StylishLoader />}>
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
                path="/skills/:skillKey"
                element={<SkillsOverView />}
              />

              <Route
                path="/resume"
                element={<Resume />}
              />

            
              <Route
                path="demos"
                element={<Demos />}
              />

              <Route
                path="demos/tailwind-frequencies"
                element={<TailWindFrequencies />}
              />

              <Route
                path="demos/recharts-mouse-event-data-viz"
                element={<RechartsMouseEventDataViz />}
              />

              <Route
                path="demos/chat"
                element={<ChatDemo />}
              />

              <Route
                path="demos/sentiment-analysis"
                element={<SentimentAnalysis />}
              />

              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </Suspense>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default RoutesIndex;
