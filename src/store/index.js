import { configureStore } from "@reduxjs/toolkit";
import contextMenuReducer from "./contextMenuSlice";
import treeReducer from "./treeSlice";
import modalReducer from "./modalSlice";
import navbarReducer from "./navbarSlide";
import alertDialogReducer from "./alertDialogSlice";
import globalDataReducer from "./globalDataSlice";
import editorReducer from "./editorSlice";

export const store = configureStore({
  reducer: {
    contextMenu: contextMenuReducer,
    tree: treeReducer,
    modal: modalReducer,
    navbar: navbarReducer,
    alertDialog: alertDialogReducer,
    globalData: globalDataReducer,
    editor: editorReducer,
  },
});
