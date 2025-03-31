import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { gradientText } from "../../styles/styles.ts";
import { SkillCardProps } from "./skillsData.tsx";

const ShowCaseSolutions = ( { currentSkill }: { currentSkill: SkillCardProps } ) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={gradientText(theme)}
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
                                        transform:
                                            "translateY(-8px) scale(1.03)",
                                        boxShadow: `0 15px 30px ${
                                            alpha(
                                                theme.palette.primary.dark,
                                                0.2,
                                            )
                                        }`,
                                    },
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: "12px",
                                    background: index % 2 === 0
                                        ? `linear-gradient(135deg, white 0%, ${
                                            alpha(
                                                theme.palette.primary.light,
                                                0.1,
                                            )
                                        } 100%)`
                                        : `linear-gradient(135deg, white 0%, ${
                                            alpha(
                                                theme.palette.secondary.light,
                                                0.1,
                                            )
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
                                        clipPath:
                                            "polygon(100% 0, 0 0, 100% 100%)",
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
                                                    : theme.palette.secondary
                                                        .main,
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
                                        {component.tags.map((tag, idx) => {
                                            return (
                                                <Chip
                                                    key={idx}
                                                    label={tag}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: "medium",
                                                        background:
                                                            index % 2 === 0
                                                                ? alpha(
                                                                    theme
                                                                        .palette
                                                                        .primary
                                                                        .main,
                                                                    0.1,
                                                                )
                                                                : alpha(
                                                                    theme
                                                                        .palette
                                                                        .secondary
                                                                        .main,
                                                                    0.1,
                                                                ),
                                                        borderColor:
                                                            index % 2 === 0
                                                                ? alpha(
                                                                    theme
                                                                        .palette
                                                                        .primary
                                                                        .main,
                                                                    0.3,
                                                                )
                                                                : alpha(
                                                                    theme
                                                                        .palette
                                                                        .secondary
                                                                        .main,
                                                                    0.3,
                                                                ),
                                                        color: index % 2 === 0
                                                            ? theme.palette
                                                                .primary.dark
                                                            : theme.palette
                                                                .secondary.dark,
                                                        border: "1px solid",
                                                        "&:hover": {
                                                            background:
                                                                index % 2 === 0
                                                                    ? alpha(
                                                                        theme
                                                                            .palette
                                                                            .primary
                                                                            .main,
                                                                        0.2,
                                                                    )
                                                                    : alpha(
                                                                        theme
                                                                            .palette
                                                                            .secondary
                                                                            .main,
                                                                        0.2,
                                                                    ),
                                                        },
                                                    }}
                                                />
                                            );
                                        })}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </>
    );
};

export default ShowCaseSolutions;
