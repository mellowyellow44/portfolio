import ThemeToggleSwitch from "../../components/ThemeToggleSwitch";

export interface SkillCardProps {
    id: string;
    title: string;
    logoSrc: string;
    description: string;
    bulletPoints: string[];
    path: string;
    themeCodeSnippet?: string;
    advancedComponents?: {
        name: string;
        desc: string;
    }[];
    experience?: {
        company: string;
        years: string;
        focus: string;
    }[];
    implementation?: string;
}

export interface SkillsData {
    [key: string]: SkillCardProps;
}

export const skillsData: SkillsData = {
    // React
    react: {
        id: "react",
        title: "React",
        logoSrc: "/react-logo.png",
        description:
            "JavaScript library for building user interfaces with reusable components.",
        bulletPoints: [
            "Component-based architecture",
            "Virtual DOM for performance",
            "Declarative UI development",
            "Extensive ecosystem",
        ],
        path: "/skills/react",
        advancedComponents: [
            {
                name: "Data Grid",
                desc:
                    "Complex data tables with sorting, filtering, and virtual scrolling",
            },
            {
                name: "Date/Time Pickers",
                desc:
                    "Calendar and time selection components with localization",
            },
            {
                name: "Dialog System",
                desc: "Modal workflows and multi-step forms",
            },
            {
                name: "Material Charts",
                desc: "Data visualization using recharts integration",
            },
            {
                name: "Theme Provider",
                desc: "Dynamic theming with light/dark mode support",
            },
            {
                name: "Custom Styled Components",
                desc: "Advanced component styling and extensions",
            },
        ],
        experience: [
            {
                company: "American Express",
                years: "2+ years",
                focus: "Financial dashboards and reporting interfaces",
            },
            {
                company: "CSAA",
                years: "3+ years",
                focus: "Insurance admin systems and customer portals",
            },
            {
                company: "Precedent",
                years: "2 years",
                focus: "Legal document management interfaces",
            },
        ],
        //talk about React implementation in this portfolio (not MUI or theme)
        implementation:
            `This portfolio showcases my React expertise by leveraging reusable components and advanced state management using hooks and context. 
            It highlights my ability to optimize performance through React’s virtual DOM, code splitting, and lazy loading, ensuring efficient and scalable UI rendering. 
            Additionally, it demonstrates the integration of popular libraries such as Redux to maintain robust application state and deliver a seamless user experience.`,
        themeCodeSnippet: `import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { alpha, Box, Divider, Paper, Tab, Tabs, Typography, useTheme, } from "@mui/material";
import Grid from "@mui/material/Grid";
import ViewFullSourceCode from "../../components/ViewFullSourceCode";
import ExpertiseHeader from "./ExpertiseHeader";
import { muiExpertiseHeaderProps, reactExpertiseHeaderProps, } from "./ExpertiseProps";
import { githubRepoLink } from "../../constants/links";
import ThemeToggleSwitch from "../../components/ThemeToggleSwitch";
import CodeBlock from "../../components/CodeBlock";
import TabPanel from "../../components/TabPanel";
import { skillsData, SkillsData } from "./skillsData";

const headerPropsMapping: Record<keyof SkillsData, any> = {
  mui: muiExpertiseHeaderProps,
  react: reactExpertiseHeaderProps,
};

const SkillExpertise: React.FC = () => {
  const theme = useTheme();
  const params = useParams();
  const skillKey = params.skillKey as keyof SkillsData | undefined;
  const [tabIndex, setTabIndex] = useState(0);

  if (!skillKey) {
    return <Typography variant="h6">Skill not found</Typography>;
  }
  const currentSkill = skillsData[skillKey];
  const headerProps = headerPropsMapping[skillKey];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(10px)",
      }}
    >
      <ExpertiseHeader {...headerProps} />

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Implementation" />
        <Tab label="Experience" />
        <Tab label="Advanced Components" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Typography variant="h6" gutterBottom>
          Implementation Example
        </Typography>
        <Typography variant="body2" paragraph>
          {currentSkill.implementation}
        </Typography>

        <CodeBlock code={currentSkill.themeCodeSnippet || ""} />

        <ViewFullSourceCode link={githubRepoLink} />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Typography variant="h6" gutterBottom>
          Professional {currentSkill.title} Experience
        </Typography>
        <Grid container spacing={2}>
          {currentSkill.experience &&
            currentSkill.experience.map((job, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Box sx={{ minWidth: 120 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {job.company}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {job.years}
                    </Typography>
                  </Box>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2 }}
                  />
                  <Box>
                    <Typography variant="body2">
                      {job.focus}
                    </Typography>
                  </Box>
                </Box>
                {index < (currentSkill.experience?.length ?? 0) - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <Typography variant="h6" gutterBottom>
          Advanced {currentSkill.title} Components
        </Typography>
        <Grid container spacing={2}>
          {currentSkill.advancedComponents &&
            currentSkill.advancedComponents.map((component, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {component.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {component.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </TabPanel>
    </Paper>
  );
};

export default SkillExpertise;
`,
    },

    // MUI
    mui: {
        id: "mui",
        title: "Material UI",
        logoSrc: "/mui-logo.png",
        description:
            "Comprehensive library of React components implementing Google's Material Design.",
        bulletPoints: [
            "Responsive component library",
            "Theming & customization",
            "Accessible UI components",
            "Advanced grid system",
        ],
        path: "/skills/mui",
        advancedComponents: [
            {
                name: "Data Grid",
                desc:
                    "Complex data tables with sorting, filtering, and virtualization.",
            },
            {
                name: "Date/Time Pickers",
                desc:
                    "Robust components for date and time selection with localization support.",
            },
            {
                name: "Dialog System",
                desc:
                    "Modal dialogs for confirmations, forms, and multi-step interactions.",
            },
            {
                name: "Theme Provider",
                desc:
                    "Customizable theming solution for dynamic light/dark mode and branding.",
            },
            {
                name: "Custom Styled Components",
                desc:
                    "Extending and overriding default MUI styles for unique interfaces.",
            },
            {
                name: "Material Charts",
                desc:
                    "Data visualization components using recharts integration.",
            },
        ],
        implementation:
            `This portfolio features a custom theme with dynamic light/dark mode
          toggling (via the ThemeToggleSwitch button). The theme configuration
          integrates with Redux for persistent state management.`,
        experience: [
            {
                company: "American Express",
                years: "4+ years",
                focus:
                    "Developing financial dashboards and reporting interfaces with MUI.",
            },
            {
                company: "CSAA",
                years: "3+ years",
                focus:
                    "Building responsive insurance admin systems and customer portals using MUI.",
            },
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "Implementing legal document management systems using Material UI.",
            },
        ],
        themeCodeSnippet: `// Theme configuration with dynamic mode switching
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
  
  export default ThemeToggleSwitch;`,
    },
};
