import classes from "./Button.module.css";
import GraphHours from "../graph/GraphHours";

function DayButton(props) {

  // not needed?
  function getGraph_day(event) {
    return <GraphHours day={props.text}></GraphHours>;
  }

  function action() {
    props.onClick();
  }

  // function graphShow() {
  //   setGraphIsOpen(true);
  // }

  return (
    <div className={classes.actions}>
      <button buttonText={props.text} onClick={action}>
        {props.text}
      </button>
    </div>
  );
}

export default DayButton;
