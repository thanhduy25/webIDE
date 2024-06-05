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
    updateFileContent: (state, action) => {
      state.fileEditing.fileContent = action.payload;
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
      const treeFlattenClone = { ...state.treeDirectoryFlatten };
      let treeFlattenPaths = Object.keys(treeFlatten);

      let highestLevel = 0;

      treeFlattenPaths.forEach((path) => {
        const level = path.split("/").length;
        if (level > highestLevel) highestLevel = level;
      });

      while (highestLevel > 0) {
        treeFlattenPaths = treeFlattenPaths.filter((path) => {
          const pathArr = path.split("/");
          const level = pathArr.length;

          if (level === highestLevel) {
            const parentFolder = pathArr.join("/");

            if (!parentFolder) return true;

            if (!Object.hasOwn(treeFlattenClone[parentFolder], "children")) {
              treeFlattenClone[parentFolder].children = [];
            }

            treeFlattenClone[parentFolder].children.push(
              treeFlattenClone[path]
            );

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
  updateFileContent,
  changeFileEditing,
  changeContentFileEditing,
  convertTreeDirectoryFlatten,
  updateTreeDirectoryFlatten,
} = treeSlice.actions;

export default treeSlice.reducer;
