import { PredictionGraph } from "../components/graph/WeeklyGraphs.js";
import { SigninGraph } from "../components/graph/MonthlyGraphs.js";
function PageOne(req, res) {
  return (
    <div>
      <h2 style={{ color: "white" }}>Future Occupancy</h2>
      <PredictionGraph />
      <br />
      <SigninGraph />
    </div>
  );
}

export default PageOne;
