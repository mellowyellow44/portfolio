import React from "react";
import { Link } from "react-router-dom";
import { Box, CardActionArea, Paper, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SkillCardProps } from "./skillsData.tsx";

// Parent card wrapper
const SkillCardWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: 150,
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

// Use "inherit" so the background matches the parent Paper in dark mode
const LogoSection = styled(Box)({
  height: "60%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 8,
  backgroundColor: "inherit", // or remove this line entirely
});

const TitleSection = styled(Box)({
  height: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 8,
  backgroundColor: "inherit", // or remove this line entirely
});

const Logo = styled("img")({
  maxWidth: "60px",
  maxHeight: "60px",
  objectFit: "contain",
});

const SkillCard: React.FC<SkillCardProps> = ({
  id,
  title,
  logoSrc,
  description,
  bulletPoints,
  path,
}) => {
  return (
    <Tooltip title={`Click to explore how I use ${title} in my projects.`} arrow>
      <SkillCardWrapper elevation={2}>
        <CardActionArea
          component={Link}
          to={path}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LogoSection>
            <Logo src={logoSrc} alt={title} />
          </LogoSection>

          <TitleSection>
            <Typography variant="subtitle1" fontWeight="bold" align="center">
              {title}
            </Typography>
            <Typography
              variant="caption"
              align="center"
              color="text.secondary"
              fontStyle="italic"
              sx={{ mt: 0.5 }}
            >
              Click to learn more
            </Typography>
          </TitleSection>
        </CardActionArea>
      </SkillCardWrapper>
    </Tooltip>
  );
};

export default SkillCard;
