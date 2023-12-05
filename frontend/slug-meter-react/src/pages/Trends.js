import { PredictionGraph } from "../components/graph/WeeklyGraphs.js";
import {
  SigninMonthGraph,
  OccupancyDayGraph,
  SigninDayGraph,
} from "../components/graph/MonthlyGraphs.js";
import CalendarPicker from "../components/forms/CalendarPicker.js";
import Card from "../components/ui/Card.js";

function PageOne(req, res) {
  return (
    <div>
      <h2 style={{ color: "white" }}>Future Occupancy</h2>
      <PredictionGraph />
      <br />
      <h2 style={{ color: "white" }}>Historical Data</h2>
      <CalendarPicker />
    </div>
  );
}

export default PageOne;
