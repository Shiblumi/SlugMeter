import classes from "./Button.module.css";
import GraphHours from "../graph/GraphHours";
import { useEffect, useState } from "react";

function DayButton(props) {
  const [showGraph, setShowGraph] = useState(false);

  // function action(day) {
  //   props.onClick(day);
  //   console.log(props.text);
  //   setShowGraph(!showGraph);
  // }

  // function graphShow() {
  //   setGraphIsOpen(true);
  // }

  return (
    <div className={classes.actions}>
      <button
        buttonText={props.text}
        onClick={() => {
          props.onClick(props.text);
          console.log(props.text);
          setShowGraph(!showGraph);
        }}
      >
        {props.text}
      </button>
    </div>
  );
}

export default DayButton;
