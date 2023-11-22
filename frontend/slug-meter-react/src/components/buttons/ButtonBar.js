import GraphSelection from "../graph/GraphSelection";
import GraphHours from "../graph/GraphHours";
import classes from "./ButtonBar.module.css";
import DayButton from "./DayButton";
import Card from "../ui/Card";

// MAKE A CHILD THAT REEIVES DATA AND RETURNS THE GRAPH
function ButtonBar(props) {

  return (
    <div>
      <div className={classes.bar}>
        {/* Note: Use inline funcs. for onClick; using func. ptrs calls the function on compile, not on click. */}
        <DayButton text="Sun" num={0} onClick={props.onClick} />
        <DayButton text="Mon" num={1} onClick={props.onClick} />
        <DayButton text="Tue" num={2} onClick={props.onClick} />
        <DayButton text="Wed" num={3} onClick={props.onClick} />
        <DayButton text="Thu" num={4} onClick={props.onClick} />
        <DayButton text="Fri" num={5} onClick={props.onClick} />
        <DayButton text="Sat" num={6} onClick={props.onClick} />
      </div>

    </div>
  );
}

export default ButtonBar;
