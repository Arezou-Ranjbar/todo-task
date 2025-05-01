import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import english from "react-date-object/locales/gregorian_en";

const today = new DateObject().convert(gregorian, english).format("YYYY-MM-DD");

interface IDate {
  selectedDate: string | null;
}

const initialState: IDate = {
  selectedDate: today,
};

// slice
const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = dateSlice.actions;

export default dateSlice.reducer;
