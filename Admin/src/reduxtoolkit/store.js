import { configureStore } from "@reduxjs/toolkit";
import formslice from "./CategorySlice";
 // Make sure this slice name aligns

const store = configureStore({
  reducer: {
    category: formslice
  }
});

export default store;