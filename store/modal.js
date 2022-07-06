import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  deleteCommentId: "",
};

const modalDisplaySlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOn(state) {
      state.showModal = true;
      state.deleteCommentId = "";
    },
    modalOff(state) {
      state.showModal = false;
      state.deleteCommentId = "";
    },
    deleteComment(state, action) {
      state.deleteCommentId = action.payload;
    },
  },
});

export default modalDisplaySlice.reducer;

export const modalActions = modalDisplaySlice.actions;
