import { OccupancyGraph } from "../components/graph/WeeklyGraphs.js";
import CurOccupancy from "../components/layout/CurOccupancy";

// The home page. Holds a Current occupancy display and a graph of occupancy over past week
function MainPage() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "Inter,  sans-serif",
          color: "white",
          marginBottom: "0.5rem",
          textShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        Current Occupancy
      </h2>
      <CurOccupancy />
      <br />
      <h2
        style={{
          fontFamily: "Inter,  sans-serif",
          color: "white",
          textShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        Gym Hourly Occupancy
      </h2>
      <OccupancyGraph />
    </div>
  );
}

export default MainPage;
