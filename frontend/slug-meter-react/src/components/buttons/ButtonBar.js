import classes from "./ButtonBar.module.css";
import DayButton from "./DayButton";
import { useState } from "react";

function ButtonBar(props) {
  const [graphIsOpen, setGraphIsOpen] = useState(false);

  function setActiveGraph(day) {
    console.log(day);
    setGraphIsOpen(true);
  }
  return (
    <div className={classes.bar}>
        {/* Note: Use inline funcs. for onClick; using func. ptrs calls the function on compile, not on click. */}
      <DayButton text="Sun" onClick={() => setActiveGraph("Sun")}/>
      <DayButton text="Mon" onClick={() => setActiveGraph("Mon")}/>
      <DayButton text="Tue" onClick={() => setActiveGraph("Tue")}/>
      <DayButton text="Wed" onClick={() => setActiveGraph("Wed")}/>
      <DayButton text="Thu" onClick={() => setActiveGraph("Thu")}/>
      <DayButton text="Fri" onClick={() => setActiveGraph("Fri")}/>
      <DayButton text="Sat" onClick={() => setActiveGraph("Sat")}/>
    </div>
  );
}

export default ButtonBar;
