import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFacility } from "../facility/facilityApi";

interface BookingState {
  bookings: TFacility | null;
}

const initialState: BookingState = {
  bookings: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state: BookingState, action: PayloadAction<TFacility>) => {
      state.bookings = action.payload;
    },
    removeBooking: (state: BookingState) => {
      state.bookings = null;
    },
  },

});

export const { addBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
