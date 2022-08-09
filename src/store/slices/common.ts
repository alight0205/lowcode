import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    position: {
      x: 0,
      y: 0,
    },
  },
  reducers: {
  },
});

//- reducer方法的每个case都会生成一个action
export default commonSlice.reducer;
