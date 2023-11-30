import {PredictionGraph} from "../components/graph/WeeklyGraphs.js";

function PageOne(req, res) {
  return (
    <div>
      <h2>Page 1 (Slug Meter)</h2>
      <PredictionGraph />
    </div>
  );
}

export default PageOne;
