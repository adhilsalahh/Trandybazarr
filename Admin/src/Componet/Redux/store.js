import { configureStore } from "@reduxjs/toolkit";
import EdithSlice from './EdithSlice';
import formslice from '../../reduxtoolkit/CategorySlice';

export const store = configureStore({
  reducer: {
    Edith: EdithSlice,
    category: formslice
  }
});

export default store;