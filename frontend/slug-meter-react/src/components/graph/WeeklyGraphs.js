import BarChartWeek from "./BarChartWeek";



export function OccupancyGraph(props) {

  let fetchRequest="occupancy";
  let title = "Hourly Occupancy";

  return (
    <BarChartWeek text={title} day={props.day} request={fetchRequest} />
    );
}

export function SigninGraph(props) {

    let fetchRequest="signins"
    let title = "Hourly Sign-ins";

    return (
          <BarChartWeek text={title} day={props.day} request={fetchRequest}/>
      );
}
