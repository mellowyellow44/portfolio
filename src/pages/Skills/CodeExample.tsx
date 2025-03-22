import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { gradientText } from "./styles";
import { SkillCardProps } from "./skillsData.tsx";
import { githubRepoLink } from "../../constants/links";
import CodeBlock from "../../components/CodeBlock";
import ViewFullSourceCode from "../../components/ViewFullSourceCode";

const CodeExample = ({ currentSkill }: { currentSkill: SkillCardProps }) => {
    
    const theme = useTheme();

    return (
        <>
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
                    border: `1px solid ${
                        alpha(theme.palette.primary.main, 0.2)
                    }`,
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
        </>
    );
};

export default CodeExample;
