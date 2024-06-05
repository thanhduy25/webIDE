import { createSlice } from "@reduxjs/toolkit";

const initialGlobalDataState = {
  courseId: null,
  projectId: null,
  branch: null,
  authorName: null,
  authorEmail: null,
};

export const globalDataSlice = createSlice({
  name: "globalData",
  initialState: initialGlobalDataState,
  reducers: {
    setGlobalData: (state, action) => {
      state.courseId = action.payload.courseId;
      state.projectId = action.payload.projectId;
      state.branch = action.payload.branch;
      state.authorName = action.payload.authorName;
      state.authorEmail = action.payload.authorEmail;
    },
  },
});

export const { setGlobalData } = globalDataSlice.actions;

export default globalDataSlice.reducer;
