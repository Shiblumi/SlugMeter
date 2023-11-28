import { useState } from "react";
import Card from "../ui/Card";

function CurOccupancy(props) {
    const [occupancy, setOccupancy] = useState(0);
    fetchData();

    async function fetchData() {
        try {
    
          const response = await fetch("http://localhost:9000/currentOccupancy");
          const responseJson = await response.json();
    
          setOccupancy(responseJson.occupancy);
          
          //setData(responseText);
          //console.log(data);
        } catch (err) {
          console.error(err);
          //setText(
          //  "Problem connecting to back-end server (Make sure to launch it on a different port!)"
          //);
        }
    }

  return (
    <div>
      <Card> Current Occupancy is: {occupancy}</Card>
    </div>
  );
}

export default CurOccupancy;