import React from 'react';
import PaletteIcon from '@mui/icons-material/Palette';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import SpeedIcon from '@mui/icons-material/Speed';
import CodeIcon from '@mui/icons-material/Code';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import UpdateIcon from '@mui/icons-material/Update';
import ThemeToggleSwitch from '../../components/ThemeToggleSwitch.tsx';

export interface ExpertiseHeaderProps {
  title: string;
  description: string;
  chips: {
      icon: React.ReactElement;
      label: string;
      color?:
          | "default"
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning";
      variant?: "filled" | "outlined";
  }[];
}

export const muiExpertiseHeaderProps: ExpertiseHeaderProps = {
  title: "Material UI Expertise",
  description:
    "With over 10 years of experience working with Material UI, I've developed extensive proficiency across the entire component library. This portfolio itself demonstrates my ability to build beautiful, responsive interfaces using MUI's comprehensive toolkit.",
  chips: [
    { icon: <PaletteIcon />, label: "Custom Theming", color: "primary" },
    { icon: <ThemeToggleSwitch />, label: "Dark/Light Mode", color: "primary", variant: "outlined" },
    { icon: <MobileFriendlyIcon />, label: "Responsive Design", color: "primary", variant: "outlined" },
    { icon: <SpeedIcon />, label: "Performance Optimized", color: "primary", variant: "outlined" }
  ]
};

export const reactExpertiseHeaderProps: ExpertiseHeaderProps = {
  title: "React Expertise",
  description:
    "With extensive experience in React development, I build dynamic, scalable, and high-performance applications. Leveraging modern JavaScript and best practices, I ensure seamless user experiences across platforms.",
  chips: [
    { icon: <CodeIcon />, label: "Component-Based", color: "primary", variant: "outlined" },
    { icon: <DeveloperModeIcon />, label: "Hooks & Context", color: "primary", variant: "outlined" },
    { icon: <UpdateIcon />, label: "Modern JavaScript", color: "primary", variant: "outlined" },
    { icon: <SpeedIcon />, label: "Optimized Performance", color: "primary", variant: "outlined" }
  ]
};




