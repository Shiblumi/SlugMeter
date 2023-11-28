import classes from "./GraphSelection.module.css";
import ButtonBar from "../buttons/ButtonBar";
import {SigninGraph, OccupancyGraph} from "./WeeklyGraphs";
import Card from "../ui/Card";
import { useState, useMemo } from "react";

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

  //const [data, setData] = useState([]);

  function switchDayGraph(day) {
    setDay(day);
    
    // return <GraphHours text={sample[day]} />;
  }
  return (
    <div className={classes.graphSelectRegion}>
      <ButtonBar onClick={switchDayGraph}/>
      <Card>{dayNameMap[dayOfWeek] && <OccupancyGraph text={dayNameMap[dayOfWeek] + " Graph"} day={dayOfWeek} />}</Card>
      <Card>{dayNameMap[dayOfWeek] && <SigninGraph text={dayNameMap[dayOfWeek] + " Graph"} day={dayOfWeek} />}</Card>
    </div>
  );
}

export default GraphSelection;
