import classes from "./Button.module.css";

function DayButton(props) {

  function getGraph_day(event) {
    // Call mongoDB to get data for the day
  }

  return (
    <div className={classes.actions}>
      <button buttonText={props.text} onClick={getGraph_day}>{props.text}</button>
    </div>
  );
}

export default DayButton;
