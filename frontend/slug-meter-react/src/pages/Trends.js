import { PredictionGraph } from "../components/graph/WeeklyGraphs.js";
import { SigninGraph } from "../components/graph/MonthlyGraphs.js";
import CalendarPicker from "../components/forms/CalendarPicker.js";
import Card from "../components/ui/Card.js";


function PageOne(req, res) {
  return (
    <div>
      <Card>
        <CalendarPicker />
      </Card>
      <h2 style={{ color: "white" }}>Future Occupancy</h2>
      <PredictionGraph />
      <br />
      <SigninGraph />
    </div>
  );
}

export default PageOne;
