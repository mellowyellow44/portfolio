import React, { useState } from "react";
import ThemeToggleSwitch from "./ThemeToggleSwitch.tsx";
import { alpha, AppBar, Avatar, Box, Button, Container, Divider, Drawer, Fade, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Slide, Toolbar, Tooltip, Typography, useScrollTrigger, useTheme, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from '@mui/icons-material/Article';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import CodeIcon from "@mui/icons-material/Code";
// import WorkIcon from "@mui/icons-material/Work";
// import EmailIcon from "@mui/icons-material/Email";
// import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { githubProfileLink, linkedInProfileLink } from "../constants/links.ts";

// Hide AppBar on scroll down
function HideOnScroll(props: { children: React.ReactElement }) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = () => {
    const theme = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();
    const isDarkMode = theme.palette.mode === "dark";

    // Mobile drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Search state
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Profile menu state
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    // Social menu state
    const [anchorElSocial, setAnchorElSocial] = useState<null | HTMLElement>(
        null,
    );

    // Navigation items
    const navItems = [
        { name: "Skills", icon: <PersonIcon />, path: "/skills" },
        { name: "Resume", icon: <ArticleIcon />, path: "/resume" },
        { name: "Demos", icon: <PlayArrowIcon />, path: "/demos" },
    ];

    // Social items
    const socialItems = [
        { name: "GitHub", icon: <GitHubIcon />, url: githubProfileLink },
        {
            name: "LinkedIn",
            icon: <LinkedInIcon />,
            url: linkedInProfileLink,
        },
        // { name: "Twitter", icon: <TwitterIcon />, url: "https://twitter.com/" },
    ];

    // User menu items
    const userMenuItems = [
        { name: "Profile", path: "/profile" },
        { name: "Account", path: "/account" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Logout", path: "/logout" },
    ];

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenSocialMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSocial(event.currentTarget);
    };

    const handleCloseSocialMenu = () => {
        setAnchorElSocial(null);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSearchToggle = () => {
        setSearchOpen(!searchOpen);
        if (searchOpen) {
            setSearchQuery("");
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Search query:", searchQuery);
        // Implement search functionality here
        setSearchOpen(false);
        setSearchQuery("");
    };

    // Check if the current path matches a navigation item
    const isActiveRoute = (path: string) => {
        //make active if first part of path matches
        const currentPathPrefix = `/${location.pathname.split("/")[1]}`;
        return currentPathPrefix === path
    };

    // Drawer content
    const drawer = (
        <Box sx={{ width: 280 }} role="presentation">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 700 }}
                >
                    Alan's Portfolio
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="close drawer"
                    onClick={handleDrawerToggle}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={isActiveRoute(item.path)}
                            onClick={handleDrawerToggle}
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.12,
                                    ),
                                    "&:hover": {
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.18,
                                        ),
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {socialItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            component="a"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <HideOnScroll>
                <AppBar
                    position="sticky"
                    color="default"
                    elevation={1}
                    sx={{
                        backdropFilter: "blur(8px)",
                        backgroundColor: alpha(
                            theme.palette.background.default,
                            0.8,
                        ),
                    }}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {/* Logo/Title - Mobile */}
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontWeight: 700,
                                    letterSpacing: ".1rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                ALAN'S PORTFOLIO
                            </Typography>

                            {/* Mobile Menu Button */}
                            <Box
                                sx={{
                                    flexGrow: 0,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="open drawer"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleDrawerToggle}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>

                            {/* Logo/Title - Mobile */}
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    letterSpacing: ".1rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                ALAN'S PORTFOLIO
                            </Typography>

                            {/* Desktop Nav Items */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    ml: 4,
                                }}
                            >
                                {navItems.map((item) => (
                                    <Button
                                        key={item.name}
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            mx: 1,
                                            color: "inherit",
                                            borderBottom:
                                                isActiveRoute(item.path)
                                                    ? `2px solid ${theme.palette.primary.main}`
                                                    : "none",
                                            borderRadius: 0,
                                            "&:hover": {
                                                backgroundColor: "transparent",
                                                borderBottom: `2px solid ${
                                                    alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.5,
                                                    )
                                                }`,
                                            },
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </Box>

                            {/* Search Icon & Box */}
                            <Box
                                component="form"
                                onSubmit={handleSearchSubmit}
                                sx={{
                                    position: "relative",
                                    borderRadius: theme.shape.borderRadius,
                                    backgroundColor: alpha(
                                        theme.palette.common.white,
                                        0.15,
                                    ),
                                    "&:hover": {
                                        backgroundColor: alpha(
                                            theme.palette.common.white,
                                            0.25,
                                        ),
                                    },
                                    marginRight: theme.spacing(2),
                                    marginLeft: 0,
                                    width: searchOpen
                                        ? { xs: "100%", sm: "auto" }
                                        : "auto",
                                    transition: theme.transitions.create(
                                        "width",
                                    ),
                                    display: "flex",
                                }}
                            >
                                <IconButton
                                    sx={{ p: "10px" }}
                                    aria-label="search"
                                    onClick={handleSearchToggle}
                                >
                                    <SearchIcon />
                                </IconButton>
                                <Fade in={searchOpen}>
                                    <InputBase
                                        sx={{
                                            color: "inherit",
                                            width: searchOpen
                                                ? {
                                                    xs: "100%",
                                                    sm: "12ch",
                                                    md: "20ch",
                                                }
                                                : 0,
                                            transition: theme.transitions
                                                .create("width"),
                                            padding: searchOpen
                                                ? theme.spacing(1, 1, 1, 0)
                                                : 0,
                                        }}
                                        placeholder="Search…"
                                        inputProps={{ "aria-label": "search" }}
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)}
                                        autoFocus={searchOpen}
                                    />
                                </Fade>
                            </Box>

                            {/* Theme Toggle */}
                            <Tooltip
                                title={isDarkMode ? "Light Mode" : "Dark Mode"}
                            >
                                <ThemeToggleSwitch />
                            </Tooltip>

                            {/* Social Links Menu */}
                            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                                {socialItems.map((item) => (
                                    <Tooltip key={item.name} title={item.name}>
                                        <IconButton
                                            component="a"
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ ml: 1 }}
                                            color="inherit"
                                        >
                                            {item.icon}
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </Box>

                            {/* Mobile Social Links Menu */}
                            <Box sx={{ display: { xs: "flex", md: "none" } }}>
                                <Tooltip title="Social links">
                                    <IconButton
                                        onClick={handleOpenSocialMenu}
                                        sx={{ ml: 1 }}
                                        color="inherit"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="social-menu-appbar"
                                    anchorEl={anchorElSocial}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElSocial)}
                                    onClose={handleCloseSocialMenu}
                                >
                                    {socialItems.map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            component="a"
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleCloseSocialMenu}
                                        >
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <Typography textAlign="center">
                                                {item.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            {/* User Menu */}
                            {/* <Box sx={{ flexGrow: 0, ml: 2 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Alan"
                                            src="/static/images/avatar/2.jpg"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {userMenuItems.map((item) => (
                                        <MenuItem
                                            key={item.name}
                                            component={Link}
                                            to={item.path}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">
                                                {item.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box> */}
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;
