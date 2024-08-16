import { createSlice } from "@reduxjs/toolkit";
import { sortArrayByProperty } from "../../utils/array";

const staticSlices = createSlice({
  name: "static",
  initialState: {
    experienceLevels: null,
    preparationStages: null,
    companies: null,
  },
  reducers: {
    setExperienceLevels: (state, action) => {
      state.experienceLevels = action.payload;
    },
    setPreparationStages: (state, action) => {
      state.preparationStages = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    updateCompaniesState: (state, action) => {
      const data = action.payload;
      let current = [...state.companies, data];
      let sorted = sortArrayByProperty(current);
      state.companies = sorted;
    },
  },
});

export const {
  setExperienceLevels,
  setPreparationStages,
  setCompanies,
  updateCompaniesState,
} = staticSlices.actions;
export default staticSlices.reducer;
