import GraphSelection from "./GraphSelection.js";

//Graph of daily occupancy, simulataneously loads all days of week
export function OccupancyGraph(props) {
  let fetchRequest = "occupancyOfWeek";
  let title = "Hourly Occupancy";
  let live = true;
  let upcomingWeek = false;

  return (
    <GraphSelection
      text={title}
      request={fetchRequest}
      live={live}
      upcomingWeek={upcomingWeek}
    />
  );
}

//Graph of daily signins, simulataneously loads all days of week
export function SigninGraph(props) {
  let fetchRequest = "signinsOfWeek";
  let title = "Hourly Sign-ins";
  let live = true;
  let upcomingWeek = false;

  return (
    <GraphSelection
      text={title}
      request={fetchRequest}
      live={live}
      upcomingWeek={upcomingWeek}
    />
  );
}

//Graph of daily ML predictions, simulataneously loads all days of week
export function PredictionGraph(props) {
  let fetchRequest = "predictionsOfWeek";
  let title = "Hourly Predicted Occupancy";
  let live = false;
  let upcomingWeek = true;

  return (
    <GraphSelection
      text={title}
      request={fetchRequest}
      live={live}
      upcomingWeek={upcomingWeek}
    />
  );
}
