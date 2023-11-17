import classes from "./ButtonBar.module.css";
import DayButton from "./DayButton";
import { useState } from "react";

// MAKE A CHILD THAT REEIVES DATA AND RETURNS THE GRAPH
function ButtonBar(props) {
  const [day, setDay] = useState(); // set to today

  return (
    <div className={classes.bar}>
        {/* Note: Use inline funcs. for onClick; using func. ptrs calls the function on compile, not on click. */}
      <DayButton text="Sun" dayState={day} onClick={() => setDay("Sun")}/>
      <DayButton text="Mon" dayState={day} onClick={() => setDay("Mon")}/>
      <DayButton text="Tue" dayState={day} onClick={() => setDay("Tue")}/>
      <DayButton text="Wed" dayState={day} onClick={() => setDay("Wed")}/>
      <DayButton text="Thu" dayState={day} onClick={() => setDay("Thu")}/>
      <DayButton text="Fri" dayState={day} onClick={() => setDay("Fri")}/>
      <DayButton text="Sat" dayState={day} onClick={() => setDay("Sat")}/>
    </div>
  );
}

export default ButtonBar;
