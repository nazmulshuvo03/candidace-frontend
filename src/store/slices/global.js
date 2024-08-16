import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    // dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    isAuthenticated: false,
    isAdmin: false,
    dark: false,
    loading: false,
    toastMessage: null, // { type: TOAST_TYPES, message: "", description: "" }
    modalMessageData: null, // { name: "", data: {} }
    dashboardQuery: {},
    chat: {}, // { otherUser }
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, { payload = true } = {}) => {
      state.loading = payload;
    },
    setTheme: (state) => {
      state.dark = !state.dark;
    },
    setDashboardQuery: (state, data) => {
      state.dashboardQuery = data.payload;
    },
    setToastMessage: (state, data) => {
      state.toastMessage = data.payload;
    },
    setModalMessageData: (state, data) => {
      state.modalMessageData = data.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
  },
});

export const {
  setAuthenticated,
  setLoading,
  setTheme,
  setDashboardQuery,
  setToastMessage,
  setModalMessageData,
  setAdmin,
  setChat,
} = globalSlice.actions;
export const selectTheme = (state) => state.global.dark;
export const switchLoading = (state) => !state.global.switchLoading;

export default globalSlice.reducer;
