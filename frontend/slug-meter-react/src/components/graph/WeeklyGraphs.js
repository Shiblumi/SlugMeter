import GraphSelection from "./GraphSelection.js";



export function OccupancyGraph(props) {

  let fetchRequest="occupancy";
  let title = "Hourly Occupancy";
  let live = true;
  let upcomingWeek = false;

  return (
        <GraphSelection text={title} request={fetchRequest} live={live} upcomingWeek={upcomingWeek}/>
            );
}

export function SigninGraph(props) {

    let fetchRequest="signins"
    let title = "Hourly Sign-ins";
    let live = true;
    let upcomingWeek = false;

    return (
          <GraphSelection text={title} request={fetchRequest} live={live} upcomingWeek={upcomingWeek}/>
      );
}

export function PredictionGraph(props) {

  let fetchRequest="predictions"
  let title = "Hourly Predicted Occupancy";
  let live = false;
  let upcomingWeek = true;

  return (
        <GraphSelection text={title} request={fetchRequest} live={live} upcomingWeek={upcomingWeek}/>
            );
}
