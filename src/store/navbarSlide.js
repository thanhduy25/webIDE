import { createSlice } from "@reduxjs/toolkit";
import { useToast } from '@chakra-ui/react'

const TREE = "tree";
const COMMIT = "commit";
// const toast = useToast()

const initialNavbarState = {
  contentShow: TREE,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: initialNavbarState,
  reducers: {
    toggleFileTree: (state) => {

      if (state.contentShow === TREE) {
        state.contentShow = null;
      } else {
        state.contentShow = TREE;
      }
    },
    toggleCommit: (state) => {
      if (state.contentShow === COMMIT) {
        state.contentShow = null;
      } else {
        state.contentShow = COMMIT;
      }
    },
  },
});

export const { toggleFileTree, toggleCommit } = navbarSlice.actions;

export default navbarSlice.reducer;
