import React from "react";
import SkillCard from "./SkillCard.tsx";
import { Box, Container, Grid, Typography, useTheme, } from "@mui/material";
import { skillsData } from "./skillsData";

const SkillsPage: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: 8,
                minHeight: "100vh",
                background: theme.palette.mode === "light"
                    ? "linear-gradient(120deg, #f0f0f0 0%, #ffffff 100%)"
                    : "linear-gradient(120deg, #1a1a1a 0%, #2d2d2d 100%)",
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: "center" }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            backgroundImage: theme.palette.mode === "light"
                                ? "linear-gradient(45deg, #007FFF 30%, #0059B2 90%)"
                                : "linear-gradient(45deg, #5C9CE6 30%, #83B4E6 90%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2,
                        }}
                    >
                        Technical Skills
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: 800, mx: "auto" }}
                    >
                        A showcase of my expertise across various technologies
                        and frameworks
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 800, mx: "auto", mt: 2 }}
                    >
                        Click on the skill to learn more.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {Object.values(skillsData).map((skill) => (
                        <Grid item xs={6} sm={4} md={3} key={skill.id}>
                            <SkillCard {...skill} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default SkillsPage;
