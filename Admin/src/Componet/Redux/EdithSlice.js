import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ID: "" // Initial state should be an object with a 'name' property
};

const EdithSlice = createSlice({
  name: "Edith",
  initialState,
  reducers: {
    edither: (state, action) => {
      state.ID = action.payload.ID;
    }
  }
});

export default EdithSlice.reducer;
export const { edither } = EdithSlice.actions; // Correcting the export syntax
