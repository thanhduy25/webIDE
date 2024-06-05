import { createSlice } from "@reduxjs/toolkit";

const initialContextMenuState = {
  xPos: 0,
  yPos: 0,
  isOpen: false,
};

export const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState: initialContextMenuState,
  reducers: {
    openContextMenu: (state, action) => {
      state.xPos = action.payload.xPos;
      state.yPos = action.payload.yPos;
      state.isOpen = true;
    },
    closeContextMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;
