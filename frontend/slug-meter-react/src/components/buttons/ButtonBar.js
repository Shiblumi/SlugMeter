import classes from "./ButtonBar.module.css";
import DayButton from "./DayButton";
import { useState } from "react";

// ButtonBar component that contains all the DayButtons.
function ButtonBar(props) {
  const [activeButton, setActiveButton] = useState(props.day);

  // Sets which DayButton is set as the currently selected button.
  function toggleActiveButton(num) {
    setActiveButton(num);
  }

  return (
    <div>
      <div className={classes.bar}>
        {/* NOTE: Use inline funcs. or func. ptrs for onClick; passing args calls the function on compile, not on click. */}
        <DayButton
          text="Sun"
          num={0}
          activeDay={activeButton}
          onClick={props.onClick}
          setSelfAsActive={toggleActiveButton}
        />
        <DayButton
          text="Mon"
          num={1}
          activeDay={activeButton}
          onClick={props.onClick}
          setSelfAsActive={toggleActiveButton}
        />
        <DayButton
          text="Tue"
          num={2}
          activeDay={activeButton}
          onClick={props.onClick}
          setSelfAsActive={toggleActiveButton}
        />
        <DayButton
          text="Wed"
          num={3}
          activeDay={activeButton}
          onClick={props.onClick}
          setSelfAsActive={toggleActiveButton}
        />
        <DayButton
          text="Thu"
          num={4}
          activeDay={activeButton}
          onClick={props.onClick}
          setSelfAsActive={toggleActiveButton}
        />
        <DayButton
          text="Fri"
          num={5}
          activeDay={activeButton}
          onClick={props.onClick}
          setSelfAsActive={toggleActiveButton}
        />
        <DayButton
          text="Sat"
          num={6}
          activeDay={activeButton}
          onClick={props.onClick}
          setSelfAsActive={toggleActiveButton}
        />
      </div>
    </div>
  );
}

export default ButtonBar;
