import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PageHeaderProps {
    title: string;
    subtitle: string;
    color?: string; // Default color for subtitle
}

const PageHeader = ({ title, subtitle, color='text.secondary' }: PageHeaderProps) => {
    const theme = useTheme();
    return (
        <>
            <Typography
                variant="h2"
                component="h1"
                color={theme.palette.mode === "dark" ? "white" : "primary.main"}
                gutterBottom
                sx={{
                    fontWeight: 800,
                    // backgroundImage: theme.palette.mode === "light"
                    //     ? "linear-gradient(45deg, #007FFF 30%, #0059B2 90%)"
                    //     : "linear-gradient(45deg, #5C9CE6 30%, #83B4E6 90%)",
                    // WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",

                    mb: 2,
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="h6"
                color={color}
                sx={{ maxWidth: 800, mx: "auto" }}
            >
                {subtitle}
            </Typography>
        </>
    );
};

export default PageHeader;
