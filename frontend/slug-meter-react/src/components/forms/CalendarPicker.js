import classes from "./CalendarPicker.module.css";
import * as React from "react";
import dayjs from "dayjs";
import {
  SigninMonthGraph,
  OccupancyDayGraph,
  SigninDayGraph,
} from "../graph/MonthlyGraphs.js";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Card from "../ui/Card.js";

// CalendarPicker holds the date selector and encompasses the components:
// SigninDayGraph, OccupancyDayGraph, SigninMonthGraph
function CalendarPicker() {
  /* 
  'value' is the date selected! Currently only exists in this scope, 
  but if needed, can pass a prop to this and use defaultValue={props.value}.
  Make sure to add CalendarPicker(props) if so.
  */
  const [value, setValue] = React.useState(dayjs());
  const date = new Date(value.$d);
  const time = date.valueOf();
  const dateString = date.toDateString();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={classes.dateSelectorRow}>
        <Card>
          <div className={classes.dateSelector}>
            <DatePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(newValue);
              }}
              // Options
              helperText="Select a date"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          </div>
        </Card>
        <Card>
          <div className={classes.date}><b>{dateString}</b></div>
        </Card>
      </div>
      <br />
      <div className={classes.dailyGraphsRow}>
        <Card>
          <div className={classes.dailyGraph}>
            <SigninDayGraph time={time} />
          </div>
        </Card>
        <Card>
          <div className={classes.dailyGraph}>
            <OccupancyDayGraph time={time} />
          </div>
        </Card>
      </div>
      <br />
      <Card>
        <SigninMonthGraph time={time} />
      </Card>
    </LocalizationProvider>
  );
}

export default CalendarPicker;
