import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  alpha, 
  Box, 
  Divider, 
  Paper, 
  Tab, 
  Tabs, 
  Typography, 
  useTheme,
  Card,
  CardContent,
  Chip,
  Avatar,
  Grid
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from "@mui/lab";
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ViewFullSourceCode from "../../components/ViewFullSourceCode";
import ExpertiseHeader from "./ExpertiseHeader";
import { muiExpertiseHeaderProps, reactExpertiseHeaderProps } from "./ExpertiseProps";
import { githubRepoLink } from "../../constants/links";
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
        sx={{ 
          borderBottom: 1, 
          borderColor: "divider",
          mb: 3,
          '& .MuiTab-root': {
            fontWeight: 'medium',
            fontSize: '0.95rem',
            minHeight: 48,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          },
          '& .Mui-selected': {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab label="Implementation" icon={<CodeIcon />} iconPosition="start" />
        <Tab label="Experience" icon={<WorkIcon />} iconPosition="start" />
        <Tab label="Advanced Components" icon={<CodeIcon />} iconPosition="start" />
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            display: 'inline-block'
          }}>
            Professional {currentSkill.title} Experience
          </Typography>
        </Box>

        <Timeline position="alternate" sx={{ p: 0 }}>
          {currentSkill.experience &&
            currentSkill.experience.map((job, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <WorkIcon />
                  </TimelineDot>
                  {index < (currentSkill.experience?.length ?? 0) - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': { 
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      },
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      overflow: 'visible',
                      position: 'relative'
                    }}
                  >
                    <Chip 
                      label={job.years}
                      color="primary"
                      size="small"
                      sx={{ 
                        position: 'absolute',
                        top: -12,
                        right: 16,
                        fontWeight: 'bold',
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        {job.company}
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="body1" sx={{ 
                        lineHeight: 1.6,
                        color: theme.palette.text.secondary
                      }}>
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            display: 'inline-block'
          }}>
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
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '5px',
                    height: '100%',
                    backgroundColor: theme.palette.primary.main
                  }} />
                  
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                      {component.name}
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6 
                    }}>
                      {component.desc}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                      {/* Assume each component might have tags - if they don't, you can add them to your data model */}
                      {/* {component.tags && component.tags.map((tag, idx) => (
                        <Chip 
                          key={idx} 
                          label={tag} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            borderColor: alpha(theme.palette.primary.main, 0.4),
                            color: theme.palette.primary.main
                          }}
                        />
                      ))} */}
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

export default SkillExpertise;