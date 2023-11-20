import classes from "./GraphSelection.module.css";
import ButtonBar from "../buttons/ButtonBar";
import GraphHours from "./GraphHours";
import Card from "../ui/Card";
import { useState } from "react";

function GraphSelection(props) {
  const [day, setDay] = useState("Sun"); // Default graph shown (set to today)

  const sample = {
    Sun: "SUNDAY GRAPH",
    Mon: "MONDAY GRAPH",
    Tue: "TUESDAY GRAPH",
    Wed: "WEDNESDAY GRAPH",
    Thu: "THURSDAY GRAPH",
    Fri: "FRIDAY GRAPH",
    Sat: "SATURDAY GRAPH",
  };

  function switchDayGraph(day) {
    setDay(day);
    // return <GraphHours text={sample[day]} />;
  }
  return (
    <div className={classes.graphSelectRegion}>
      <ButtonBar onClick={switchDayGraph}/>
      <Card>{day && <GraphHours text={sample[day]} />}</Card>
    </div>
  );
}

export default GraphSelection;
