import GraphSelection from "../graph/GraphSelection";
import GraphHours from "../graph/GraphHours";
import classes from "./ButtonBar.module.css";
import DayButton from "./DayButton";
import Card from "../ui/Card";
import { useState } from "react";

// MAKE A CHILD THAT REEIVES DATA AND RETURNS THE GRAPH
function ButtonBar(props) {
  const [activeButton, setActiveButton] = useState(props.day);

  function toggleActiveButton(num) {
    setActiveButton(num);
  }

  return (
    <div>
      <div className={classes.bar}>
        {/* Note: Use inline funcs. for onClick; using func. ptrs calls the function on compile, not on click. */}
        <DayButton text="Sun" num={0} activeDay={activeButton} onClick={props.onClick} setSelfAsActive={toggleActiveButton} />
        <DayButton text="Mon" num={1} activeDay={activeButton} onClick={props.onClick} setSelfAsActive={toggleActiveButton} />
        <DayButton text="Tue" num={2} activeDay={activeButton} onClick={props.onClick} setSelfAsActive={toggleActiveButton} />
        <DayButton text="Wed" num={3} activeDay={activeButton} onClick={props.onClick} setSelfAsActive={toggleActiveButton} />
        <DayButton text="Thu" num={4} activeDay={activeButton} onClick={props.onClick} setSelfAsActive={toggleActiveButton} />
        <DayButton text="Fri" num={5} activeDay={activeButton} onClick={props.onClick} setSelfAsActive={toggleActiveButton} />
        <DayButton text="Sat" num={6} activeDay={activeButton} onClick={props.onClick} setSelfAsActive={toggleActiveButton} />
      </div>

    </div>
  );
}

export default ButtonBar;
