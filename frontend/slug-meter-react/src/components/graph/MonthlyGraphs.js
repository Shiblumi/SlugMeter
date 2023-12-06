import {HeatMapMonth, HistoricDayGraph} from "./HeatMapMonth.js";
import Card from "../ui/Card";

export function SigninMonthGraph(props) {

    let fetchRequest="signinsOfMonth"
    let currentDate = new Date();
    let title = `${currentDate.toLocaleString('default', { month: 'long' })} Sign-ins`;
    let live = false;

    const textStyle = {
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        paddingTop: '6px',
      };
    
      return (
        <div style={textStyle}>
          <HeatMapMonth text={title} request={fetchRequest} live={live} time={props.time}/>
        </div>
    );
}

export function SigninDayGraph(props) {

    let fetchRequest="signinsOfDay"
    let title = "Daily Sign-ins";
    let live = false;

    return (
          <HistoricDayGraph text={title} request={fetchRequest} live={live} time={props.time}/>
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
