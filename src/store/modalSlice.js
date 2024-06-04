import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isOpen: false,
  type: null,
  action: "add",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type;
      state.action = action.payload.action;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
