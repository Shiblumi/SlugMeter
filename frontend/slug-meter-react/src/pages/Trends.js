import { PredictionGraph } from "../components/graph/WeeklyGraphs.js";
import CalendarPicker from "../components/forms/CalendarPicker.js";

// Home of the Trends page
// Holds two seperate components:
// PredictionGraph for weekly ML data display
// CalendarPicker for historical daily and monthly data
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
