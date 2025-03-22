import React, { useEffect, useState } from "react";
import SkillCard from "./SkillCard";
import {
    Box,
    Chip,
    Container,
    Fade,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import SecurityIcon from "@mui/icons-material/Security";
import BrushIcon from "@mui/icons-material/Brush";
import AppsIcon from "@mui/icons-material/Apps"; // Added icon for "All" category
import { SkillCardProps, skillsData } from "./skillsData";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    setFilteredSkills,
    setSearchTerm,
    setSelectedCategory,
} from "../../redux/slices/skills";
import { JSX } from "react/jsx-runtime";
import PageHeader from "../../components/PageHeader";

// Define skill categories for filtering
const categories = [
    { name: "All", icon: <AppsIcon />, key: null }, // Added "All" category
    { name: "Frontend", icon: <CodeIcon />, key: "frontend" },
    { name: "Data", icon: <StorageIcon />, key: "data" },
    { name: "Cloud", icon: <CloudIcon />, key: "cloud" },
    { name: "Security", icon: <SecurityIcon />, key: "security" },
    { name: "Design", icon: <BrushIcon />, key: "design" },
];

// Map skills to categories (you can adjust these mappings)
const categoryMap = {
    frontend: [
        "react",
        "typescript",
        "mui",
        "tailwind",
        "datavis",
        "microfrontend",
    ],
    data: ["postgresql", "redux", "websockets", "python"],
    cloud: ["aws", "nodejs", "deno"],
    security: ["security", "testing"],
    design: ["mui", "tailwind", "datavis"],
};

const SkillsPage: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { searchTerm, selectedCategory, filteredSkills } = useSelector(
        (state: any) => state.skills,
    );

    const [isTyping, setIsTyping] = useState(false);

    // Function to determine if a skill should be shown based on search and category filters
    useEffect(() => {
        const searchResults = Object.values(skillsData).filter((skill) => {
            const matchesSearch = searchTerm === "" ||
                skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                skill.description.toLowerCase().includes(
                    searchTerm.toLowerCase(),
                ) ||
                skill.bulletPoints.some((point) =>
                    point.toLowerCase().includes(searchTerm.toLowerCase())
                );

            const matchesCategory = selectedCategory === null ||
                categoryMap[selectedCategory as keyof typeof categoryMap]
                    ?.includes(skill.id);

            return matchesSearch && matchesCategory;
        });

        dispatch(setFilteredSkills(searchResults));
    }, [searchTerm, selectedCategory]);

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 500);
    };

    // Handle category selection
    const handleCategoryClick = (category: string | null) => {
        dispatch(setSelectedCategory(category));
    };

    // Clear search field
    const handleClearSearch = () => {
        dispatch(setSearchTerm(""));
    };

    // Animation variants for card grid
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const childVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <Box
            sx={{
                py: 4,
                minHeight: "100vh",
                background: theme.palette.mode === "light"
                    ? "linear-gradient(120deg, #f0f0f0 0%, #ffffff 100%)"
                    : "linear-gradient(120deg, #1a1a1a 0%, #2d2d2d 100%)",
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: "center" }}>

                    <PageHeader
                        title="Technical Skills"
                        subtitle="A showcase of my expertise across various technologies and frameworks."
                    />
                    
                    {/* Search box with animation */}
                    <Paper
                        elevation={3}
                        sx={{
                            maxWidth: 600,
                            mx: "auto",
                            mt: 4,
                            mb: 3,
                            p: 0.5,
                            display: "flex",
                            alignItems: "center",
                            borderRadius: 3,
                            overflow: "hidden",
                            transition: "all 0.3s ease-in-out",
                            border: isTyping
                                ? `2px solid ${theme.palette.primary.main}`
                                : `2px solid transparent`,
                            boxShadow: isTyping
                                ? `0 0 10px ${theme.palette.primary.main}40`
                                : undefined,
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Search skills, technologies, or keywords..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            variant="standard"
                            sx={{
                                px: 2,
                                "& .MuiInput-underline:before": {
                                    borderBottom: "none",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottom: "none",
                                },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                    {
                                        borderBottom: "none",
                                    },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: searchTerm && (
                                    <InputAdornment position="end">
                                        <Fade in={Boolean(searchTerm)}>
                                            <IconButton
                                                edge="end"
                                                onClick={handleClearSearch}
                                                size="small"
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Fade>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Paper>

                    {/* Category filter chips */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        justifyContent="center"
                        sx={{ mb: 4, mt: 2, flexWrap: "wrap", gap: 1 }}
                    >
                        {categories.map((category) => (
                            <Chip
                                key={category.name}
                                label={category.name}
                                icon={category.icon}
                                onClick={() =>
                                    handleCategoryClick(category.key)}
                                color={selectedCategory === category.key
                                    ? "primary"
                                    : "default"}
                                variant={selectedCategory === category.key
                                    ? "filled"
                                    : "outlined"}
                                sx={{
                                    px: 1,
                                    fontWeight:
                                        selectedCategory === category.key
                                            ? "bold"
                                            : "normal",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: 2,
                                    },
                                }}
                            />
                        ))}
                    </Stack>

                    {/* Results count */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        {filteredSkills.length ===
                                Object.values(skillsData).length
                            ? "Showing all skills"
                            : `Showing ${filteredSkills.length} of ${
                                Object.values(skillsData).length
                            } skills`}
                    </Typography>
                </Box>

                {/* Skill cards grid with staggered animation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={3}>
                        {filteredSkills.length > 0
                            ? (
                                filteredSkills.map((skill: JSX.IntrinsicAttributes & SkillCardProps, index: number) => (
                                    <Grid
                                        item
                                        xs={6}
                                        sm={4}
                                        md={3}
                                        key={skill.id}
                                    >
                                        <motion.div
                                            variants={childVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <SkillCard {...skill} />
                                        </motion.div>
                                    </Grid>
                                ))
                            )
                            : (
                                <Box
                                    sx={{
                                        width: "100%",
                                        textAlign: "center",
                                        py: 5,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        No skills match your search
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Try adjusting your search terms or
                                        category filters
                                    </Typography>
                                </Box>
                            )}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default SkillsPage;