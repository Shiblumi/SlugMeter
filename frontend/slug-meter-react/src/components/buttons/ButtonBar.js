import classes from "./ButtonBar.module.css";
import DayButton from "./Button";

function ButtonBar() {
  return (
    <div className={classes.bar}>
      <DayButton text="Sun"></DayButton>
      <DayButton text="Mon"></DayButton>
      <DayButton text="Tue"></DayButton>
      <DayButton text="Wed"></DayButton>
      <DayButton text="Thu"></DayButton>
      <DayButton text="Fri"></DayButton>
      <DayButton text="Sat"></DayButton>
    </div>
  );
}

export default ButtonBar;
