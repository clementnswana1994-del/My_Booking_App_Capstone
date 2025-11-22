import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "../features/serviceSlice";
import bookingReducer from "../features/bookingSlice";

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    booking: bookingReducer,
  },
});