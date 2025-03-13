import React from "react";
import { alpha, Box, useTheme } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    code: string;
    language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "jsx" }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 1,
                overflowX: "auto",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                "&:hover": {
                    boxShadow: theme.shadows[2],
                },
            }}
        >
            <SyntaxHighlighter
                language={language}
                style={coy}
                customStyle={{
                    margin: 0,
                    padding: "16px",
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                }}
            >
                {code}
            </SyntaxHighlighter>
        </Box>
    );
};

export default CodeBlock;
