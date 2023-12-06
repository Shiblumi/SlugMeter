import { HeatMapMonth, HistoricDayGraph } from "./HeatMapMonth.js";

//Monthly heatmap graph
export function SigninMonthGraph(props) {
  let fetchRequest = "signinsOfMonth";
  let currentDate = new Date();
  let title = `${currentDate.toLocaleString("default", {
    month: "long",
  })} Sign-ins`;
  let live = false;

  return (
    <HeatMapMonth
      text="Month Sign-ins"
      request={fetchRequest}
      live={live}
      time={props.time}
    />
  );
}

//Daily signin graph. Only loads one day at time
export function SigninDayGraph(props) {
  let fetchRequest = "signinsOfDay";
  let title = "Sign-ins";
  let live = false;

  return (
    <HistoricDayGraph
      text={title}
      request={fetchRequest}
      live={live}
      time={props.time}
    />
  );
}

//Daily occupancy graph. Only loads one day at time
export function OccupancyDayGraph(props) {
  let fetchRequest = "occupancyOfDay";
  let title = "Estimated Occupancy";
  let live = false;

  return (
    <HistoricDayGraph
      text={title}
      request={fetchRequest}
      live={live}
      time={props.time}
    />
  );
}
