import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurfSpotDto } from "../components/SurfSpot";
import { RootState } from "../store/store";

const items: SurfSpotDto[] = [];

const surfSpotsSlice = createSlice({
  name: "surfSpots",
  initialState: items,
  reducers: {
    setAllSurfSpots: (state, action: PayloadAction<SurfSpotDto[]>) => {
      return [...action.payload];
    },
    addSurfSpot: (state, action: PayloadAction<SurfSpotDto>) => {
      return [...state, action.payload];
    },
    removeSurfSpot: (state, action: PayloadAction<SurfSpotDto>) => {
      return state.filter(
        (surfSpot) =>
          surfSpot.name.replaceAll(" ", "").toLocaleLowerCase() !==
          action.payload.name.replaceAll(" ", "").toLocaleLowerCase()
      );
    },
  },
});

export const { addSurfSpot, removeSurfSpot, setAllSurfSpots } =
  surfSpotsSlice.actions;
export const getSurfSpotsSelector = (state: RootState) => state.surfSpots;
export default surfSpotsSlice.reducer;
