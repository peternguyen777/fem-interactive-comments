import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";

const store = configureStore({
  reducer: modalReducer,
});

export default store;
