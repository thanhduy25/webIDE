import { configureStore } from "@reduxjs/toolkit";
import contextMenuReducer from "./contextMenuSlice";
import treeReducer from "./treeSlice";
import modalReducer from "./modalSlice";
import navbarReducer from "./navbarSlide";
import alertDialogReducer from "./alertDialogSlice";

export const store = configureStore({
  reducer: {
    contextMenu: contextMenuReducer,
    tree: treeReducer,
    modal: modalReducer,
    navbar: navbarReducer,
    alertDialog: alertDialogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ["alertDialog.onConfirm", "payload.onConfirm"],
      },
    }),
});
