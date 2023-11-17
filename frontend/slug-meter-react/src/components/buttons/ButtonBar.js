import classes from "./ButtonBar.module.css";
import DayButton from "./DayButton";
import { useState } from "react";

// MAKE A CHILD THAT REDDEIVES DATA AND RETURNS THE GRAPH
function ButtonBar(props) {
  const [day, setDay] = useState(); // set to today

  return (
    <div className={classes.bar}>
        {/* Note: Use inline funcs. for onClick; using func. ptrs calls the function on compile, not on click. */}
      <DayButton text="Sun" onClick={() => setDay("Sun")}/>
      <DayButton text="Mon" onClick={() => setDay("Mon")}/>
      <DayButton text="Tue" onClick={() => setDay("Tue")}/>
      <DayButton text="Wed" onClick={() => setDay("Wed")}/>
      <DayButton text="Thu" onClick={() => setDay("Thu")}/>
      <DayButton text="Fri" onClick={() => setDay("Fri")}/>
      <DayButton text="Sat" onClick={() => setDay("Sat")}/>
    </div>
  );
}

export default ButtonBar;
