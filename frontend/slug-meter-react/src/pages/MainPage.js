import GraphSelection from "../components/graph/GraphSelection";
import CurOccupancy from "../components/layout/CurOccupancy";
import ButtonBar from "../components/buttons/ButtonBar";

function MainPage() {
  return (
    <content>
      <h2>Current Occupancy</h2>
      <CurOccupancy />
      <h2>Gym Crowd History</h2>
      <GraphSelection />
    </content>
  );
}

export default MainPage;
