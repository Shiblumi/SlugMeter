import classes from "./CalendarPicker.module.css";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CalendarPicker() {
  /* 
  'value' is the date selected! Currently only exists in this scope, 
  but if needed, can pass a prop to this and use defaultValue={props.value}.
  Make sure to add CalendarPicker(props) if so.
  */
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        helperText="Select a date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}

        // If passing a prop to this component, use this:
        // defaultValue={props.value}
      />
    </LocalizationProvider>
  );
}

export default CalendarPicker;
