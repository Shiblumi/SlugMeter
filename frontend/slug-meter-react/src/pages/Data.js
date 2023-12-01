import { SigninGraph } from "../components/graph/MonthlyGraphs.js";

function PageThree(req, res) {
  return (
    <div>
      <h2>Page 1 (Slug Meter)</h2>
      <SigninGraph />
    </div>
  );
}

export default PageThree;
