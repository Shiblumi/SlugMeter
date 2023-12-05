import {HeatMapMonth, HistoricDayGraph} from "./HeatMapMonth.js";
import Card from "../ui/Card";

export function SigninMonthGraph(props) {

    let fetchRequest="signinsOfMonth"
    let title = "Monthly Sign-ins";
    let live = false;

    return (
          <Card><HeatMapMonth text={title} request={fetchRequest} live={live} time={props.time}/></Card>
      );
}

export function SigninDayGraph(props) {

    let fetchRequest="signinsOfDay"
    let title = "Daily Sign-ins";
    let live = false;

    return (
          <Card><HistoricDayGraph text={title} request={fetchRequest} live={live} time={props.time}/></Card>
      );
}

export function OccupancyDayGraph(props) {

    let fetchRequest="occupancyOfDay"
    let title = "Daily occupancy";
    let live = false;

    return (
          <Card><HistoricDayGraph text={title} request={fetchRequest} live={live} time={props.time}/></Card>
      );
}