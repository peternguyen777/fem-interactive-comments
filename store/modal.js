import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  deleteCommentId: "",
  editCommentId: "",
  updateScoreId: "",
  deleteReplyId: "",
};

const modalDisplaySlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOn(state) {
      state.showModal = true;
      state.deleteCommentId = "";
      state.deleteReplyId = "";
    },
    modalOff(state) {
      state.showModal = false;
      state.deleteCommentId = "";
      state.deleteReplyId = "";
    },
    deleteComment(state, action) {
      state.deleteCommentId = action.payload;
    },
    editComment(state, action) {
      state.editCommentId = action.payload;
    },
    updateScore(state, action) {
      state.updateScoreId = action.payload;
    },
    deleteReply(state, action) {
      state.deleteReplyId = action.payload;
    },
  },
});

export default modalDisplaySlice.reducer;

export const modalActions = modalDisplaySlice.actions;
