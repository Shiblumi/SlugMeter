import GraphHours from "../graph/GraphHours";
import classes from "./ButtonBar.module.css";
import DayButton from "./DayButton";
import Card from "../ui/Card";
import { useState } from "react";

// MAKE A CHILD THAT REEIVES DATA AND RETURNS THE GRAPH
function ButtonBar(props) {
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
    <div>
      <div className={classes.bar}>
        {/* Note: Use inline funcs. for onClick; using func. ptrs calls the function on compile, not on click. */}
        <DayButton text="Sun" dayState={day} onClick={switchDayGraph} />
        <DayButton text="Mon" dayState={day} onClick={switchDayGraph} />
        <DayButton text="Tue" dayState={day} onClick={switchDayGraph} />
        <DayButton text="Wed" dayState={day} onClick={switchDayGraph} />
        <DayButton text="Thu" dayState={day} onClick={switchDayGraph} />
        <DayButton text="Fri" dayState={day} onClick={switchDayGraph} />
        <DayButton text="Sat" dayState={day} onClick={switchDayGraph} />
      </div>
      <Card>
        {day && <GraphHours text={sample[day]} />}
        
      </Card>
    </div>
  );
}

export default ButtonBar;
