import {HeatMapMonth, HistoricDayGraph} from "./HeatMapMonth.js";

export function SigninMonthGraph(props) {

    let fetchRequest="signinsOfMonth"
    let title = "Monthly Sign-ins";
    let live = false;

    return (
          <HeatMapMonth text={title} request={fetchRequest} live={live} time={props.time}/>
      );
}

export function SigninDayGraph(props) {

    let fetchRequest="signinsOfDay"
    let title = "Daily Sign-ins";
    let live = false;

    return (
          <HistoricDayGraph text={title} request={fetchRequest} live={live} time={props.time} showAverageLine={false} showAverageValue={false}/>
      );
}

export function OccupancyDayGraph(props) {

    let fetchRequest="occupancyOfDay"
    let title = "Daily occupancy";
    let live = false;

    return (
          <HistoricDayGraph text={title} request={fetchRequest} live={live} time={props.time}/>
      );
}