export const themeCodeSnippet =

`import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import BusinessIcon from '@mui/icons-material/Business';
import ViewFullSourceCode from "../../components/ViewFullSourceCode";
import ExpertiseHeader from "./ExpertiseHeader";
import {
  muiExpertiseHeaderProps,
  reactExpertiseHeaderProps,
} from "./ExpertiseProps";
import { githubRepoLink } from "../../constants/links";
import CodeBlock from "../../components/CodeBlock";
import TabPanel from "../../components/TabPanel";
import { SkillsData, skillsData } from "./skillsData";

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
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          "& .MuiTab-root": {
            fontWeight: "medium",
            fontSize: "0.95rem",
            minHeight: 48,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          },
          "& .Mui-selected": {
            color: theme.palette.primary.main,
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="Experience" icon={<WorkIcon />} iconPosition="start" />
        <Tab label="Implementation" icon={<CodeIcon />} iconPosition="start" />
        <Tab
          label="Advanced Components"
          icon={<CodeIcon />}
          iconPosition="start"
        />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background:
                \`linear-gradient(90deg, \${theme.palette.primary.main} 0%, \${theme.palette.secondary.main} 100%)\`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
              pb: 1,
              display: "inline-block",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "3px",
                background:
                  \`linear-gradient(90deg, \${theme.palette.primary.main} 0%, \${theme.palette.secondary.main} 100%)\`,
                borderRadius: "10px",
              },
            }}
          >
            Professional {currentSkill.title} Experience
          </Typography>
        </Box>

        <Timeline position="alternate" sx={{ p: 0 }}>
          {currentSkill.experience &&
            currentSkill.experience.map((job, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      background:
                        \`linear-gradient(135deg, \${theme.palette.primary.main} 0%, \${theme.palette.secondary.main} 100%)\`,
                      boxShadow: \`0 0 10px \${
                        alpha(theme.palette.primary.main, 0.5)
                      }\`,
                      p: 1,
                    }}
                  >
                    <WorkIcon />
                  </TimelineDot>
                  {index < (currentSkill.experience?.length ?? 0) - 1 && (
                    <TimelineConnector
                      sx={{
                        background:
                          \`linear-gradient(to bottom, \${theme.palette.primary.main}, \${theme.palette.secondary.main})\`,
                        width: "3px",
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 2 }}>
                  <Card
                    elevation={3}
                    sx={{
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: \`0 15px 30px \${
                          alpha(theme.palette.primary.dark, 0.2)
                        }\`,
                      },
                      border: \`1px solid \${
                        alpha(theme.palette.primary.main, 0.2)
                      }\`,
                      borderRadius: "12px",
                      overflow: "visible",
                      position: "relative",
                      background: index % 2 === 0
                        ? \`linear-gradient(135deg, white 0%, \${
                          alpha(theme.palette.primary.light, 0.1)
                        } 100%)\`
                        : \`linear-gradient(135deg, white 0%, \${
                          alpha(theme.palette.secondary.light, 0.1)
                        } 100%)\`,
                    }}
                  >
                    <Chip
                      label={job.years}
                      sx={{
                        position: "absolute",
                        top: -16,
                        right: 16,
                        fontWeight: "bold",
                        background: index % 2 === 0
                          ? \`linear-gradient(90deg, \${theme.palette.primary.main} 0%, \${theme.palette.primary.dark} 100%)\`
                          : \`linear-gradient(90deg, \${theme.palette.secondary.main} 0%, \${theme.palette.secondary.dark} 100%)\`,
                        color: "white",
                        boxShadow: \`0 4px 8px \${
                          alpha(theme.palette.primary.main, 0.3)
                        }\`,
                        border: "2px solid white",
                        paddingLeft: 1,
                        paddingRight: 1,
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          color: index % 2 === 0
                            ? theme.palette.primary.dark
                            : theme.palette.secondary.dark,
                          display: "flex",
                          alignItems: "center",
                          "& svg": {
                            mr: 1,
                            color: index % 2 === 0
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                          },
                        }}
                      >
                        <BusinessIcon fontSize="small" />
                        {job.company}
                      </Typography>
                      <Divider
                        sx={{
                          my: 2,
                          height: "2px",
                          background: index % 2 === 0
                            ? \`linear-gradient(90deg, \${
                              alpha(theme.palette.primary.main, 0.7)
                            } 0%, \${
                              alpha(theme.palette.primary.light, 0.2)
                            } 100%)\`
                            : \`linear-gradient(90deg, \${
                              alpha(theme.palette.secondary.main, 0.7)
                            } 0%, \${
                              alpha(theme.palette.secondary.light, 0.2)
                            } 100%)\`,
                          borderRadius: "1px",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          color: theme.palette.text.secondary,
                          position: "relative",
                          pl: 2,
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "3px",
                            borderRadius: "10px",
                            background: index % 2 === 0
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                          },
                        }}
                      >
                        {job.focus}
                      </Typography>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Typography variant="h6" gutterBottom>
          Implementation Example
        </Typography>
        <Typography variant="body2" paragraph>
          {currentSkill.implementation}
        </Typography>

        <CodeBlock code={currentSkill.themeCodeSnippet || ""} />

        <ViewFullSourceCode link={githubRepoLink} />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              borderBottom: \`2px solid \${theme.palette.primary.main}\`,
              pb: 1,
              display: "inline-block",
            }}
          >
            Advanced {currentSkill.title} Components
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {currentSkill.advancedComponents &&
            currentSkill.advancedComponents.map((component, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "5px",
                      height: "100%",
                      backgroundColor: theme.palette.primary.main,
                    }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                    >
                      {component.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {component.desc}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mt: 2,
                      }}
                    >
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </TabPanel>
    </Paper>
  );
};

export default SkillExpertise;`;