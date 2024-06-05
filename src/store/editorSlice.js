import { createSlice } from "@reduxjs/toolkit";

const initialEditorState = {
  listFileOpening: {},
  fileEditing: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState: initialEditorState,
  reducers: {
    addFileOpening: (state, action) => {
      state.listFileOpening = { ...state.listFileOpening, ...action.payload };
    },
    removeFileOpening: (state, action) => {
      const newListFileOpening = {};
      for (const key of Object.keys(state.listFileOpening)) {
        if (key != action.payload) {
          newListFileOpening[key] = state.listFileOpening[key];
        }
      }

      state.listFileOpening = newListFileOpening;
    },
    setFileEditing: (state, action) => {
      state.fileEditing = action.payload;
    },
  },
});

export const { addFileOpening, removeFileOpening, setFileEditing } =
  editorSlice.actions;

export default editorSlice.reducer;
