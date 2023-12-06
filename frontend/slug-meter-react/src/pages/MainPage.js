import { OccupancyGraph } from "../components/graph/WeeklyGraphs.js";
import CurOccupancy from "../components/layout/CurOccupancy";

// The home page. Holds a Current occupancy display and a graph of occupancy over past week
function MainPage() {
  return (
    <div>
      <h2 style={{ color: "white", marginBottom: "0.5rem"}}>Current Occupancy</h2>
      <CurOccupancy />
      <br />
      <h2 style={{ color: "white" }}>Gym Crowd History</h2>
      <OccupancyGraph />
    </div>
  );
}

export default MainPage;
