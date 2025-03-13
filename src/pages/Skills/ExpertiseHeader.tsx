import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Chip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpertiseHeaderProps } from "./ExpertiseProps.tsx";

const ExpertiseHeader: React.FC<ExpertiseHeaderProps> = (
    { title, description, chips },
) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ mb: 4 }}>
            <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 2 }}
                onClick={() => navigate("/skills")}
            >
                Back to Skills
            </Button>

            <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                gutterBottom
            >
                {title}
            </Typography>

            <Typography variant="body1" paragraph>
                {description}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
                {chips.map((chip, index) => (
                    <Chip
                        key={index}
                        icon={chip.icon}
                        label={chip.label}
                        color={chip.color}
                        variant={chip.variant === "outlined"
                            ? "outlined"
                            : "filled"}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ExpertiseHeader;
