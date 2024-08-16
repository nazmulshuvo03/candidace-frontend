import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    userMeetings: [],
    details: null,
  },
  reducers: {
    setUserMeetings: (state, data) => {
      state.userMeetings = data.payload;
    },
    setMeetingDetails: (state, action) => {
      state.details = action.payload;
    },
    removeUserMeeting: (state, action) => {
      const id = action.payload;
      state.userMeetings = state.userMeetings.filter((item) => item.id !== id);
    },
  },
});

export const { setUserMeetings, setMeetingDetails, removeUserMeeting } =
  meetingSlice.actions;
export default meetingSlice.reducer;
