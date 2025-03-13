import React from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toggleThemeMode } from "../redux/slices/themes.ts";
import { useDispatch, useSelector } from "react-redux";

const ThemeToggleSwitch = () => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state: any) => state.theme.palette);

    const handleToggleTheme = () =>
        dispatch(toggleThemeMode(mode === "light" ? "dark" : "light"));

    return (
        <IconButton
            onClick={handleToggleTheme}
        >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
    );
};

export default ThemeToggleSwitch;
