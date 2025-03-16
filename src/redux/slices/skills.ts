import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SkillsStateTypes{
    searchTerm: string;
    selectedCategory: string | null;
    filteredSkills: any[];
}

const initialState: SkillsStateTypes = {
    searchTerm: "",
    selectedCategory: null,
    filteredSkills: [],
};

const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        setFilteredSkills: (state, action: PayloadAction<any[]>) => {
            state.filteredSkills = action.payload;
        },
    },
});

export const {
    setSearchTerm,
    setSelectedCategory,
    setFilteredSkills
} = skillsSlice.actions;

export default skillsSlice.reducer;

