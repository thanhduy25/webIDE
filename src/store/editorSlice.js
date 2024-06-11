import { createSlice } from "@reduxjs/toolkit";

const initialEditorState = {
  listFileOpening: {},
  fileEditing: null,
  colorMode: "dark",
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

      let newListFileOpening = null;

      if (action.payload == null) {
        newListFileOpening = {};
      } else {
        newListFileOpening = {
          ...state.listFileOpening,
          [state.fileEditing.path]: state.fileEditing,
        };
      }

      state.listFileOpening = newListFileOpening;
    },
    toggleTheme: (state) => {
      if (state.colorMode === "dark") {
        state.colorMode = "light";
      } else {
        state.colorMode = "dark";
      }
    },
  },
});

export const {
  addFileOpening,
  removeFileOpening,
  setFileEditing,
  toggleTheme,
} = editorSlice.actions;

export default editorSlice.reducer;
