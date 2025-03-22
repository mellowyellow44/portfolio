export const typescriptCodeSnippet = `
// tsconfig.json
{
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
    ]
  }
  // tsconfig.app.json
  {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
// tsconfig.node.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
// ts in React component
import React from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}

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




`;