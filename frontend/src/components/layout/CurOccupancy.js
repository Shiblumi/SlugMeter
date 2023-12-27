import { useState, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./CurOccupancy.module.css";

const { BACKEND_PORT, POLLING_INTERVAL } = require("../../constants.js");

function CurOccupancy(props) {
  const [occupancy, setOccupancy] = useState(0);

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:" + BACKEND_PORT + "/currentOccupancy"
      );
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

  useEffect(() => {
    fetchData();
    //Implementing the setInterval method
    const interval = setInterval(() => {
      fetchData();
      //console.log("Polling for Banner!");
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
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
