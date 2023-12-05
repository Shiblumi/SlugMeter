import classes from "./CalendarPicker.module.css";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  SigninMonthGraph,
  OccupancyDayGraph,
  SigninDayGraph,
} from "../graph/MonthlyGraphs.js";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { borders } from "@mui/system";
import Card from "../ui/Card.js";

function CalendarPicker() {
  /* 
  'value' is the date selected! Currently only exists in this scope, 
  but if needed, can pass a prop to this and use defaultValue={props.value}.
  Make sure to add CalendarPicker(props) if so.
  */
  const [value, setValue] = React.useState(dayjs());
  const date = new Date(value.$d);
  const time = date.valueOf();

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
              // If passing a prop to this component, use this:
              // defaultValue={props.value}
            />
          </div>
        </Card>
        <Card>
          <div className={classes.date}>{time}</div>
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
