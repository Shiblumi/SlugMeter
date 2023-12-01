import { PredictionGraph } from "../components/graph/WeeklyGraphs.js";

function PageOne(req, res) {
  return (
    <div>
      <h2 style={{ color: "white" }}>Future Occupancy</h2>
      <PredictionGraph />
    </div>
  );
}

export default PageOne;
