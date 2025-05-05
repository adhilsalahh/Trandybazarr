
import { configureStore } from "@reduxjs/toolkit";
import EdithSlice from '../Redux/EdithSlice'

const store = configureStore({
  reducer: {
    // form: formslice // Correcting the reducer key and value
    Edith:EdithSlice
  }
});

export default store;
