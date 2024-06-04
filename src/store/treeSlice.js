import { createSlice } from "@reduxjs/toolkit";

const initialTreeState = {
  treeDirectory: [],
  fileTarget: {},
  fileEditing: {
    item: null,
    content: "",
  },
};

export const treeSlice = createSlice({
  name: "tree",
  initialState: initialTreeState,
  reducers: {
    changeFileTarget: (state, action) => {
      state.fileTarget = action.payload;
    },
    updateTree: (state, action) => {
      state.treeDirectory = action.payload;
    },
    updateFileContent: (state, action) => {
      state.fileEditing.fileContent = action.payload;
    },
    changeFileEditing: (state, action) => {
      state.fileEditing.item = action.payload;
    },
  },
});

export const {
  changeFileTarget,
  updateTree,
  updateFileContent,
  changeFileEditing,
} = treeSlice.actions;

export default treeSlice.reducer;
