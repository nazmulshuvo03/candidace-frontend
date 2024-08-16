import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  profile: null,
  visitingProfile: null,
  people: [],
  completionStatus: null,
  progress: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...defaultState,
  },
  reducers: {
    resetUserState: (state, action) => {
      return defaultState;
    },
    setProfile: (state, data) => {
      state.profile = data.payload;
    },
    updateProfile: (state, action) => {
      const data = action.payload;
      const updatedProfile = { ...state.profile };

      Object.keys(data).forEach((key) => {
        if (state.profile[key] !== data[key]) {
          updatedProfile[key] = data[key];
        }
      });
      state.profile = updatedProfile;
    },
    setPeople: (state, data) => {
      state.people = data.payload;
    },
    updatePeople: (state, data) => {
      state.people = [...state.people, { ...data.payload }];
    },
    updateWorkExperience: (state, action) => {
      const data = action.payload;
      let newData = state.profile;
      newData.workExperiences = [...newData.workExperiences, data];
      state.profile = newData;
    },
    removeWorkExperience: (state, action) => {
      const id = action.payload;
      let newData = state.profile;
      newData.workExperiences = newData.workExperiences.filter(
        (work) => work.id !== id
      );
      state.profile = newData;
    },
    updateEducation: (state, action) => {
      const data = action.payload;
      let newData = state.profile;
      newData.education = [...newData.education, data];
      state.profile = newData;
    },
    removeEducation: (state, action) => {
      const id = action.payload;
      let newData = state.profile;
      newData.education = newData.education.filter((work) => work.id !== id);
      state.profile = newData;
    },
    updateInterviewExperience: (state, action) => {
      const data = action.payload;
      let newData = state.profile;
      newData.interviewExperiences = [...newData.interviewExperiences, data];
      state.profile = newData;
    },
    removeInterviewExperience: (state, action) => {
      const id = action.payload;
      let newData = state.profile;
      newData.interviewExperiences = newData.interviewExperiences.filter(
        (interview) => interview.id !== id
      );
      state.profile = newData;
    },
    setVisitingProfile: (state, action) => {
      state.visitingProfile = action.payload;
    },
    clearVisitingProfile: (state, action) => {
      state.visitingProfile = null;
    },
    updateVisitorProfileAvailability: (state, action) => {
      const data = action.payload;
      state.visitingProfile.availabilities.map((avl) => {
        if (avl.id === data.availabilityId) {
          avl.state = "BOOKED";
        }
      });
    },
    updatePeopleAvailability: (state, action) => {
      const data = action.payload;
      state.people.map((person) => {
        if (person.id === data.initiatorId) {
          person.availabilities.map((avl) => {
            if (avl.id === data.availabilityId) {
              avl.state = "BOOKED";
            }
          });
        }
      });
    },
    setCompletionStatus: (state, action) => {
      const data = action.payload;
      state.completionStatus = data;
    },
    setUserProgress: (state, action) => {
      state.progress = action.payload;
    },
    updateEmailVerificationStatus: (state, action) => {
      state.profile.email_verified = action.payload;
    },
    updateEmailSubscriptionState: (state, action) => {
      state.profile.unsubscribed = action.payload;
    },
  },
});

export const {
  resetUserState,
  setProfile,
  updateProfile,
  setPeople,
  updatePeople,
  updateWorkExperience,
  removeWorkExperience,
  updateEducation,
  removeEducation,
  updateInterviewExperience,
  removeInterviewExperience,
  setVisitingProfile,
  clearVisitingProfile,
  updateVisitorProfileAvailability,
  updatePeopleAvailability,
  setCompletionStatus,
  setUserProgress,
  updateEmailVerificationStatus,
  updateEmailSubscriptionState,
} = userSlice.actions;
export default userSlice.reducer;
