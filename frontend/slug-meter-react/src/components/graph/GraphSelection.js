import classes from "./GraphSelection.module.css";
import ButtonBar from "../buttons/ButtonBar";
import GraphHours from "./GraphHours";
import Card from "../ui/Card";

function GraphSelection(props) {
  return (
    <div className={classes.graphSelectRegion}>
      <ButtonBar />
      <Card>
        <GraphHours />
      </Card>
    </div>
  );
}

export default GraphSelection;
