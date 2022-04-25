import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { v4 as uuid } from "uuid";

export interface Notification {
  message: string;
  id: string;
}
const notificationSlice = createSlice({
  name: "notification",
  initialState: {} as Notification,
  reducers: {
    setNotification: (state, action: PayloadAction<string>) => ({
      message: action.payload,
      id: uuid(),
    }),
  },
});

export const { setNotification } = notificationSlice.actions;
export const getNotificationSelector = (state: RootState) => state.notification;
export default notificationSlice.reducer;
