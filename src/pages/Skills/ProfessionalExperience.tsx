import React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Typography,
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
import BusinessIcon from "@mui/icons-material/Business";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { gradientText } from "../../styles/styles.ts"; // Adjust the import path as necessary
import { SkillCardProps } from "./skillsData.tsx";

const ProfessionalExperience = (
    { currentSkill }: { currentSkill: SkillCardProps },
) => {
    const theme = useTheme();
    return (
        <>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={gradientText(theme)}
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
                                            alpha(
                                                theme.palette.primary.main,
                                                0.5,
                                            )
                                        }`,
                                        p: 1,
                                    }}
                                >
                                    <WorkIcon />
                                </TimelineDot>
                                {index <
                                        (currentSkill.experience?.length ?? 0) -
                                            1 && (
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
                                            transform:
                                                "translateY(-8px) scale(1.02)",
                                            boxShadow: `0 15px 30px ${
                                                alpha(
                                                    theme.palette.primary.dark,
                                                    0.2,
                                                )
                                            }`,
                                        },
                                        border: `1px solid ${
                                            alpha(
                                                theme.palette.primary.main,
                                                0.2,
                                            )
                                        }`,
                                        borderRadius: "12px",
                                        overflow: "visible",
                                        position: "relative",
                                        background: index % 2 === 0
                                            ? `linear-gradient(135deg, white 0%, ${
                                                alpha(
                                                    theme.palette.primary.light,
                                                    0.1,
                                                )
                                            } 100%)`
                                            : `linear-gradient(135deg, white 0%, ${
                                                alpha(
                                                    theme.palette.secondary
                                                        .light,
                                                    0.1,
                                                )
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
                                                alpha(
                                                    theme.palette.primary.main,
                                                    0.3,
                                                )
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
                                                    : theme.palette.secondary
                                                        .dark,
                                                display: "flex",
                                                alignItems: "center",
                                                "& svg": {
                                                    mr: 1,
                                                    color: index % 2 === 0
                                                        ? theme.palette.primary
                                                            .main
                                                        : theme.palette
                                                            .secondary.main,
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
                                                        alpha(
                                                            theme.palette
                                                                .primary.main,
                                                            0.7,
                                                        )
                                                    } 0%, ${
                                                        alpha(
                                                            theme.palette
                                                                .primary.light,
                                                            0.2,
                                                        )
                                                    } 100%)`
                                                    : `linear-gradient(90deg, ${
                                                        alpha(
                                                            theme.palette
                                                                .secondary.main,
                                                            0.7,
                                                        )
                                                    } 0%, ${
                                                        alpha(
                                                            theme.palette
                                                                .secondary
                                                                .light,
                                                            0.2,
                                                        )
                                                    } 100%)`,
                                                borderRadius: "1px",
                                            }}
                                        />
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                lineHeight: 1.7,
                                                color: theme.palette.text
                                                    .secondary,
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
                                                        ? theme.palette.primary
                                                            .main
                                                        : theme.palette
                                                            .secondary.main,
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
        </>
    );
};
export default ProfessionalExperience;
