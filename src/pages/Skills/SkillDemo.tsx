import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { gradientText } from './styles';
import { SkillsData, skillsData } from './skillsData';

import { SkillCardProps } from "./skillsData.tsx";

const SkillDemo = ( { currentSkill }: { currentSkill: SkillCardProps } ) => {

    const theme = useTheme();

    return (
        <>
                <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={gradientText(theme)}
          >
            {currentSkill.title} Demo
          </Typography>
          {currentSkill.demo && <currentSkill.demo />}
        </Box>
        </>
    )
}

export default SkillDemo;

