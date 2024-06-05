import { createSlice } from "@reduxjs/toolkit";

const initialTreeState = {
  treeDirectory: [],
  treeDirectoryFlatten: {},
  fileTarget: {},
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
    convertTreeDirectoryFlatten: (state) => {
      const treeDirectoryFlatten = {};
      const flatten = (tree) => {
        tree.forEach((item) => {
          if (item.children && item.children.length > 0) {
            flatten(item.children);
          }
          treeDirectoryFlatten[item.path] = item;
        });
      };
      flatten(state.treeDirectory);
      state.treeDirectoryFlatten = treeDirectoryFlatten;
    },
    updateTreeDirectoryFlatten: (state, action) => {
      switch (action.payload.action) {
        case "add": {
          state.treeDirectoryFlatten = {
            ...state.treeDirectoryFlatten,
            ...action.payload.item,
          };
          break;
        }
        case "update": {
          state.treeDirectoryFlatten = {
            ...state.treeDirectoryFlatten,
            [action.payload.item.path]: action.payload.item,
          };
          break;
        }
        case "rename": {
          const newFlattenTree = {};
          for (const key of Object.keys(state.treeDirectoryFlatten)) {
            if (key === action.payload.item.old.path) {
              newFlattenTree[action.payload.item.new.path] = {
                ...state.treeDirectoryFlatten[key],
                name: action.payload.item.new.name,
                path: action.payload.item.new.path,
              };
            } else {
              newFlattenTree[key] = state.treeDirectoryFlatten[key];
            }
          }
          state.treeDirectoryFlatten = newFlattenTree;
          break;
        }
        case "delete": {
          const newFlattenTree = {};
          for (const key of Object.keys(state.treeDirectoryFlatten)) {
            if (key !== action.payload.item) {
              newFlattenTree[key] = state.treeDirectoryFlatten[key];
            }
          }
          state.treeDirectoryFlatten = newFlattenTree;
          break;
        }
      }
    },
  },
});

export const {
  changeFileTarget,
  updateTree,
  updateFileContent,
  changeFileEditing,
  changeContentFileEditing,
  convertTreeDirectoryFlatten,
  updateTreeDirectoryFlatten,
} = treeSlice.actions;

export default treeSlice.reducer;
