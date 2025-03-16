import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
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
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BusinessIcon from "@mui/icons-material/Business";
import ConstructionIcon from "@mui/icons-material/Construction";
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

  const gradientText = {
    fontWeight: "bold",
    background:
      `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
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
        `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      borderRadius: "10px",
    },
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
        <Tab
          label="Showcase Solutions"
          icon={<ConstructionIcon />}
          iconPosition="start"
        />
        <Tab label="Experience" icon={<WorkIcon />} iconPosition="start" />
        <Tab label="Demo" icon={<OndemandVideoIcon />} iconPosition="start" sx={{display: currentSkill.demo ? 'inherit' : 'none'}}></Tab>
        <Tab label="Code Example" icon={<CodeIcon />} iconPosition="start" sx={{display: currentSkill.themeCodeSnippet ? 'inherit' : 'none'}}></Tab>
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={gradientText}
          >
            {currentSkill.title} Showcase Solutions
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {currentSkill.advancedComponents &&
            currentSkill.advancedComponents.map((component, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.03)",
                      boxShadow: `0 15px 30px ${
                        alpha(theme.palette.primary.dark, 0.2)
                      }`,
                    },
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "12px",
                    background: index % 2 === 0
                      ? `linear-gradient(135deg, white 0%, ${
                        alpha(theme.palette.primary.light, 0.1)
                      } 100%)`
                      : `linear-gradient(135deg, white 0%, ${
                        alpha(theme.palette.secondary.light, 0.1)
                      } 100%)`,
                    border: `1px solid ${
                      alpha(theme.palette.primary.main, 0.2)
                    }`,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "5px",
                      background: index % 2 === 0
                        ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                        : `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 0,
                      width: "30px",
                      height: "30px",
                      background: index % 2 === 0
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                      clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                      opacity: 0.7,
                    }}
                  />

                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: index % 2 === 0
                          ? theme.palette.primary.dark
                          : theme.palette.secondary.dark,
                        mb: 2,
                        display: "inline-block",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -5,
                          left: 0,
                          width: "40%",
                          height: "2px",
                          background: index % 2 === 0
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                          borderRadius: "1px",
                        },
                      }}
                    >
                      {component.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
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
                            ? `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                            : `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                        },
                      }}
                    >
                      {component.desc}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.8,
                        mt: 3,
                      }}
                    >
{/* {                        console.log('component', component) } */}
                      {component.tags.map((tag, idx) =>{
                        return (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            fontWeight: "medium",
                            background: index % 2 === 0
                              ? alpha(theme.palette.primary.main, 0.1)
                              : alpha(theme.palette.secondary.main, 0.1),
                            borderColor: index % 2 === 0
                              ? alpha(theme.palette.primary.main, 0.3)
                              : alpha(theme.palette.secondary.main, 0.3),
                            color: index % 2 === 0
                              ? theme.palette.primary.dark
                              : theme.palette.secondary.dark,
                            border: "1px solid",
                            "&:hover": {
                              background: index % 2 === 0
                                ? alpha(theme.palette.primary.main, 0.2)
                                : alpha(theme.palette.secondary.main, 0.2),
                            },
                          }}
                        />
                      )})}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={gradientText}
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
                        `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      boxShadow: `0 0 10px ${
                        alpha(theme.palette.primary.main, 0.5)
                      }`,
                      p: 1,
                    }}
                  >
                    <WorkIcon />
                  </TimelineDot>
                  {index < (currentSkill.experience?.length ?? 0) - 1 && (
                    <TimelineConnector
                      sx={{
                        background:
                          `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
                        boxShadow: `0 15px 30px ${
                          alpha(theme.palette.primary.dark, 0.2)
                        }`,
                      },
                      border: `1px solid ${
                        alpha(theme.palette.primary.main, 0.2)
                      }`,
                      borderRadius: "12px",
                      overflow: "visible",
                      position: "relative",
                      background: index % 2 === 0
                        ? `linear-gradient(135deg, white 0%, ${
                          alpha(theme.palette.primary.light, 0.1)
                        } 100%)`
                        : `linear-gradient(135deg, white 0%, ${
                          alpha(theme.palette.secondary.light, 0.1)
                        } 100%)`,
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
                          ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                          : `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                        color: "white",
                        boxShadow: `0 4px 8px ${
                          alpha(theme.palette.primary.main, 0.3)
                        }`,
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
                            ? `linear-gradient(90deg, ${
                              alpha(theme.palette.primary.main, 0.7)
                            } 0%, ${
                              alpha(theme.palette.primary.light, 0.2)
                            } 100%)`
                            : `linear-gradient(90deg, ${
                              alpha(theme.palette.secondary.main, 0.7)
                            } 0%, ${
                              alpha(theme.palette.secondary.light, 0.2)
                            } 100%)`,
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

      <TabPanel value={tabIndex} index={2}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={gradientText}
          >
            {currentSkill.title} Demo
            </Typography>
            {currentSkill.demo && ( <currentSkill.demo /> ) }

        </Box>
        </TabPanel>


      <TabPanel value={tabIndex} index={3}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={gradientText}
          >
            {currentSkill.title} Code Example
          </Typography>
        </Box>

        <Card
          elevation={3}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: `0 12px 24px ${
                alpha(theme.palette.primary.dark, 0.15)
              }`,
            },
            borderRadius: "12px",
            overflow: "hidden",
            mb: 4,
            background: `linear-gradient(135deg, white 0%, ${
              alpha(theme.palette.primary.light, 0.1)
            } 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>

            <Typography
              variant="body1"
              paragraph
              sx={{
                lineHeight: 1.8,
                // Remove the color: theme.palette.text.secondary that makes text transparent
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
                  background:
                    `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
              }}
            >
              {currentSkill.implementation}
            </Typography>
          </CardContent>
        </Card>

        <Box

        >
          <CodeBlock code={currentSkill.themeCodeSnippet || ""} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            transform: "scale(1.1)",
            transformOrigin: "center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.15)",
            },
          }}
        >
          <ViewFullSourceCode link={githubRepoLink} />
        </Box>
      </TabPanel>
    </Paper>
  );
};

export default SkillExpertise;
