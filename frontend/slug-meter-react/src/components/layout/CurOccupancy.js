import { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./CurOccupancy.module.css";

const { BACKEND_PORT, POLLING_INTERVAL } = require("../../constants.js");

//Element for displaying the current occupancy as a number
function CurOccupancy(props) {
  const [occupancy, setOccupancy] = useState(0);

  //fetches data by calling backend
  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:" + BACKEND_PORT + "/currentOccupancy"
      );
      const responseJson = await response.json();
      setOccupancy(responseJson.occupancy);

    } catch (err) {
      console.error(err);
    }
  }

  // useEffect triggers on page load
  // It initially fetches the data, then sets up an interval for polling
  useEffect(() => {
    fetchData();
    //This will set an interval that will trigger fetchData() every POLLING_INTERVAL seconds
    const interval = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL);
    //returns a function to clean up the interval
    return () => clearInterval(interval);
    //list of dependencies from useEffect
  }, [occupancy]);


  return (
    <div>
      <Card>
        <div className={classes.currOccupancy}>
          Current Occupancy is: {occupancy}
        </div>
      </Card>
    </div>
  );
}

export default CurOccupancy;
