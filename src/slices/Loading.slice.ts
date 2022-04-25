import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    setLoading: (state, action) => action.payload,
  },
});

export const { setLoading } = loadingSlice.actions;
export const getLoadingSelector = (state: RootState) => state.loading;
export default loadingSlice.reducer;
