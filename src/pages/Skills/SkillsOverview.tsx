import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  alpha,
  Box,
  Card,
  CardContent,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ConstructionIcon from "@mui/icons-material/Construction";
import ViewFullSourceCode from "../../components/ViewFullSourceCode";
import ExpertiseHeader from "./ExpertiseHeader";
import { gradientText } from "../../styles/styles.ts";
import {
  muiExpertiseHeaderProps,
  reactExpertiseHeaderProps,
} from "./ExpertiseProps";
import { githubRepoLink } from "../../constants/links";
import CodeBlock from "../../components/CodeBlock";
import TabPanel from "../../components/TabPanel";
import { SkillsData, skillsData } from "./skillsData";
import ShowCaseSolutions from "./ShowCaseSolutions";
import ProfessionalExperience from "./ProfessionalExperience.tsx";
import SkillDemo from "./SkillDemo.tsx";

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

        <Tab
          label="Showcase Solutions"
          icon={<ConstructionIcon />}
          iconPosition="start"
        />

        <Tab
          label="Demo"
          icon={<OndemandVideoIcon />}
          iconPosition="start"
          sx={{ display: currentSkill.demo ? "inherit" : "none" }}
        >
        </Tab>
        <Tab
          label="Code Example"
          icon={<CodeIcon />}
          iconPosition="start"
          sx={{ display: currentSkill.themeCodeSnippet ? "inherit" : "none" }}
        >
        </Tab>
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <ProfessionalExperience currentSkill={currentSkill} />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ShowCaseSolutions currentSkill={currentSkill} />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <SkillDemo currentSkill={currentSkill} />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={gradientText(theme)}
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

        <Box>
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
