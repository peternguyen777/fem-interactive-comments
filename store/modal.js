import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const modalDisplaySlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOn(state) {
      state.showModal = true;
    },
    modalOff(state) {
      state.showModal = false;
    },
  },
});

export default modalDisplaySlice.reducer;

export const modalActions = modalDisplaySlice.actions;
