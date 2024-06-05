import { createSlice, current } from "@reduxjs/toolkit";

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
  },
});

export const {
  changeFileTarget,
  updateTree,
  convertTreeDirectoryFlatten,
  updateTreeDirectoryFlatten,
  convertFlattenToNestedTreeDirectory,
} = treeSlice.actions;

export default treeSlice.reducer;
