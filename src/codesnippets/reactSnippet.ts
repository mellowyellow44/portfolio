export const reactSnippet = `import React, { useState } from "react";
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
`