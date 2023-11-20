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
        <DayButton text="Sun" onClick={props.onClick} />
        <DayButton text="Mon" onClick={props.onClick} />
        <DayButton text="Tue" onClick={props.onClick} />
        <DayButton text="Wed" onClick={props.onClick} />
        <DayButton text="Thu" onClick={props.onClick} />
        <DayButton text="Fri" onClick={props.onClick} />
        <DayButton text="Sat" onClick={props.onClick} />
      </div>

    </div>
  );
}

export default ButtonBar;
