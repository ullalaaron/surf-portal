import { configureStore } from "@reduxjs/toolkit";
import surfSpots from "../slices/SurfSpots.slice";
import loading from "../slices/Loading.slice";
import notification from "../slices/Notification.slice";

const store = configureStore({
  reducer: {
    surfSpots,
    loading,
    notification,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
