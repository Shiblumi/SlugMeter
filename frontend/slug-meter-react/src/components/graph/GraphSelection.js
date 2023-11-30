import classes from "./GraphSelection.module.css";
import ButtonBar from "../buttons/ButtonBar";
import BarChartWeek from "./BarChartWeek.js";
import Card from "../ui/Card";
import { useState } from "react";

const dayNameMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};


function GraphSelection(props) {
  console.log("Rendering!");
  const today = new Date()
  const [dayOfWeek, setDay] = useState(today.getDay()); // Default graph shown (set to today)

  let curDay = today.getDay();
  const dayOffset = -1* ((curDay + 7 - dayOfWeek) % 7);
  let selectedDate = new Date();
  selectedDate.setDate(selectedDate.getDate() + dayOffset);
  const dateString = selectedDate.toDateString();

  //const [data, setData] = useState([]);

  function switchDayGraph(day) {
    setDay(day);
    
    // return <GraphHours text={sample[day]} />;
  }
  return (
    <div className={classes.graphSelectRegion}>
      <ButtonBar day={dayOfWeek} onClick={switchDayGraph}/>
      <Card>{dayNameMap[dayOfWeek] && <BarChartWeek dateString={dateString} day={dayOfWeek} text={props.text} request={props.request} live={props.live}/>}</Card>
    </div>
  );
}

export default GraphSelection;
