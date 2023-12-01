import { OccupancyGraph } from "../components/graph/WeeklyGraphs.js";
import CurOccupancy from "../components/layout/CurOccupancy";

function MainPage() {
  return (
    <div>
      <h2 style={{ color: "white" }}>Current Occupancy</h2>
      <CurOccupancy />
      <h2 style={{ color: "white" }}>Gym Crowd History</h2>
      <OccupancyGraph />
    </div>
  );
}

export default MainPage;
