import {OccupancyGraph} from "../components/graph/WeeklyGraphs.js";
import CurOccupancy from "../components/layout/CurOccupancy";
import ButtonBar from "../components/buttons/ButtonBar";

function MainPage() {
  return (
    <content>
      <h2>Current Occupancy</h2>
      <CurOccupancy />
      <h2>Gym Crowd History</h2>
      <OccupancyGraph />
    </content>
  );
}

export default MainPage;
