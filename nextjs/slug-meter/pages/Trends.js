import { PredictionGraph } from "../components/graph/WeeklyGraphs.js";
import CalendarPicker from "../components/forms/CalendarPicker.js";
import Layout from "../components/layout/Layout.js";

// Home of the Trends page
// Holds two seperate components:
// PredictionGraph for weekly ML data display
// CalendarPicker for historical daily and monthly data
function PageOne(req, res) {
  return (
    <Layout>
      <div style={{ fontFamily: "Inter,  sans-serif" }}>
        <h2
          style={{
            color: "white",
            textShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          Future Occupancy
        </h2>
        <PredictionGraph />
        <br />
        <h2
          style={{
            color: "white",
            textShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          Historical Data
        </h2>
        <CalendarPicker />
      </div>
    </Layout>
  );
}

export default PageOne;
