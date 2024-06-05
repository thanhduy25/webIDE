import { createSlice } from "@reduxjs/toolkit";

const initialAlertDialogState = {
  isOpen: false,
};

export const AlertDialogSlice = createSlice({
  name: "alertDialog",
  initialState: initialAlertDialogState,
  reducers: {
    openAlertDialog: (state) => {
      state.isOpen = true;
    },
    closeAlertDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAlertDialog, closeAlertDialog } = AlertDialogSlice.actions;

export default AlertDialogSlice.reducer;
