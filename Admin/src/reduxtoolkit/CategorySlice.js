import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "default", // Initial state
};

const formSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    submit: (state, action) => {
      console.log("Reducer triggered with payload:", action.payload); // Debug
      state.value = action.payload.value; // Correctly update state
    },
  },
});

export default formSlice.reducer;
export const { submit } = formSlice.actions;
