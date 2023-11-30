import GraphSelection from "./GraphSelection.js";



export function OccupancyGraph(props) {

  let fetchRequest="occupancy";
  let title = "Hourly Occupancy";
  let live = true;

  return (
        <GraphSelection text={title} request={fetchRequest} live={live}/>
            );
}

export function SigninGraph(props) {

    let fetchRequest="signins"
    let title = "Hourly Sign-ins";
    let live = true;

    return (
          <GraphSelection text={title} request={fetchRequest} live={live}/>
      );
}

export function PredictionGraph(props) {

  let fetchRequest="predictions"
  let title = "Hourly Predicted Occupancy";
  let live = false;

  return (
        <GraphSelection text={title} request={fetchRequest} live={live}/>
            );
}
