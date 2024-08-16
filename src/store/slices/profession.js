import { createSlice } from "@reduxjs/toolkit";

const ProfessionSlice = createSlice({
  name: "profession",
  initialState: {
    items: [],
    targetProfession: null,
    allSkill: null,
    allExperienceType: null,
  },
  reducers: {
    setProfessions: (state, action) => {
      state.items = action.payload;
    },
    setTargetProfession: (state, action) => {
      state.targetProfession = state.items.find(
        (element) => element.id === action.payload
      );
    },
    updateProfessions: (state, action) => {
      const data = action.payload;
      const alreadyExists =
        state.items.length && state.items.some((s) => s.id === data.id);
      if (!alreadyExists) state.items.push(data);
    },
    removeProfession: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    setAllSkill: (state, action) => {
      const data = action.payload;
      state.allSkill = data;
    },
    updateSkills: (state, action) => {
      const data = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === data.profession_id
      );
      if (professionToUpdate) {
        const alreadyExists =
          professionToUpdate.skills &&
          professionToUpdate.skills.length &&
          professionToUpdate.skills.some((s) => s.id === data.id);
        if (!alreadyExists)
          professionToUpdate.skills && professionToUpdate.skills.length
            ? professionToUpdate.skills.push(data)
            : (professionToUpdate.skills = [data]);
      }
    },
    removeSkill: (state, action) => {
      const { id, profession } = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === profession
      );
      if (professionToUpdate) {
        professionToUpdate.skills = professionToUpdate.skills.filter(
          (skill) => skill.id !== id
        );
      }
    },
    setAllExperienceType: (state, action) => {
      const data = action.payload;
      state.allExperienceType = data;
    },
    updateExperienceTypes: (state, action) => {
      const data = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === data.profession_id
      );
      if (professionToUpdate) {
        const alreadyExists =
          professionToUpdate.experienceTypes &&
          professionToUpdate.experienceTypes.length &&
          professionToUpdate.experienceTypes.some((s) => s.id === data.id);
        if (!alreadyExists)
          professionToUpdate.experienceTypes &&
          professionToUpdate.experienceTypes.length
            ? professionToUpdate.experienceTypes.push(data)
            : (professionToUpdate.experienceTypes = [data]);
      }
    },
    removeExperienceTypes: (state, action) => {
      const { id, profession } = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === profession
      );
      if (professionToUpdate) {
        professionToUpdate.experienceTypes =
          professionToUpdate.experienceTypes.filter((et) => et.id !== id);
      }
    },
  },
});

export const {
  setProfessions,
  setTargetProfession,
  updateProfessions,
  removeProfession,
  setAllSkill,
  updateSkills,
  removeSkill,
  setAllExperienceType,
  updateExperienceTypes,
  removeExperienceTypes,
} = ProfessionSlice.actions;
export default ProfessionSlice.reducer;
