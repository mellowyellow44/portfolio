import React from "react";
import { Box, Button } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

interface ViewFullSourceCodeProps {
    link: string;
}

export const ViewFullSourceCode: React.FC<ViewFullSourceCodeProps> = ({ link }) => (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
            variant="outlined"
            startIcon={<CodeIcon />}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            View Full Source Code
        </Button>
    </Box>
);

export default ViewFullSourceCode;
