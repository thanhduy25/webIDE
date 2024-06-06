import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";
import { createUpdateAction, addAction } from "../utilities";

const initialTreeState = {
  treeDirectory: [],
  treeDirectoryFlatten: {},
  originalTreeDirectoryFlatten: {},
  fileTarget: "root",
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
    convertTreeDirectoryFlatten: (state) => {
      const treeDirectoryFlatten = {};

      const flatten = (tree) => {
        tree.forEach((item) => {
          const itemCloned = { ...item };
          if (itemCloned.children && itemCloned.children.length > 0) {
            flatten(itemCloned.children);
            delete itemCloned.children;
          }
          treeDirectoryFlatten[itemCloned.path] = itemCloned;
        });
      };
      flatten([...current(state.treeDirectory)]);

      state.treeDirectoryFlatten = treeDirectoryFlatten;
      if (Object.keys(state.originalTreeDirectoryFlatten).length === 0) {
        state.originalTreeDirectoryFlatten = treeDirectoryFlatten;
      }
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

          if (
            action.payload.item.content != action.payload.item.originalContent
          ) {
            const actionsList = localStorage.actions
              ? JSON.parse(localStorage.actions)
              : [];

            let isExist = false;
            const newActionsList = actionsList.map((act) => {
              if (
                act.action === "update" &&
                act.file_path === action.payload.item.path
              ) {
                act.content = action.payload.item.content;
                isExist = true;
              }
              return act;
            });

            localStorage.actions = JSON.stringify(newActionsList);

            if (!isExist) {
              const actionUpdate = createUpdateAction(
                action.payload.item.path,
                action.payload.item.content
              );
              addAction(actionUpdate);
            }
          }
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
    convertFlattenToNestedTreeDirectory: (state) => {
      const treeFlattenClone = { ...current(state.treeDirectoryFlatten) };
      let treeFlattenPaths = Object.keys(treeFlattenClone);

      let highestLevel = 0;

      treeFlattenPaths.forEach((path) => {
        const level = path.split("/").length;
        if (level > highestLevel) highestLevel = level;
      });

      while (highestLevel > 1) {
        treeFlattenPaths = treeFlattenPaths.filter((path) => {
          const pathArr = path.split("/");
          const level = pathArr.length;

          if (level === highestLevel) {
            const parentFolder = pathArr.slice(0, -1).join("/");
            if (!parentFolder) return true;

            const parentClone = { ...treeFlattenClone[parentFolder] };

            if (!parentClone.children) parentClone.children = [];
            parentClone.children = [
              ...parentClone.children,
              treeFlattenClone[path],
            ];

            treeFlattenClone[parentFolder] = parentClone;

            delete treeFlattenClone[path];

            return false;
          }
          return true;
        });
        highestLevel--;
      }
      state.treeDirectory = Object.values(treeFlattenClone);
    },
    handleSave: (state, action) => {
      let item = current(state.treeDirectoryFlatten[action.payload.path]);

      item = { ...item, content: action.payload.newContent };

      action.payload = { ...action.payload, action: "update", item };
      treeSlice.caseReducers.updateTreeDirectoryFlatten(state, action);
    },
  },
});

export const {
  changeFileTarget,
  updateTree,
  convertTreeDirectoryFlatten,
  updateTreeDirectoryFlatten,
  convertFlattenToNestedTreeDirectory,
  handleSave,
} = treeSlice.actions;

export default treeSlice.reducer;
