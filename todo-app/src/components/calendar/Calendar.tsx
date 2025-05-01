import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import gregorian from "react-date-object/calendars/gregorian";
import english from "react-date-object/locales/gregorian_en";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../lib/redux/dateSlice";
import DateObject from "react-date-object";
import { RootState } from "../../lib/redux/store";

const DateCalendar = () => {
  const dispatch = useDispatch();

  // Get the currently selected date from Redux state
  const selectedDate = useSelector(
    (state: RootState) => state.date.selectedDate
  );

  const handleChange = (date: DateObject | null) => {
    if (date) {
      // convert to gregorian
      const gregorianDate = new DateObject(date)
        .convert(gregorian, english)
        .format("YYYY-MM-DD");
      // dispatch date to store
      dispatch(setSelectedDate(gregorianDate));
    }
  };

  // Convert the stored gregorian date to Persian
  const displayDate = selectedDate
    ? new DateObject({
        date: selectedDate,
        calendar: gregorian,
        locale: english,
      })
        .convert(persian)
        .format("YYYY/MM/DD")
    : "";

  return (
    <div>
      <Calendar
        value={displayDate}
        calendar={persian}
        locale={persian_fa}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateCalendar;
