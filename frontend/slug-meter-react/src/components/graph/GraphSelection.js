import classes from "./GraphSelection.module.css";
import ButtonBar from "../buttons/ButtonBar";
import GraphHours from "./GraphHours";
import Card from "../ui/Card";
import { useState, useMemo } from "react";

const dayNameMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

let weeklyData = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
}

function GraphSelection(props) {
  console.log("Rendering!");
  const today = new Date()
  const [dayOfWeek, setDay] = useState(today.getDay()); // Default graph shown (set to today)
  const [dataLoaded, setLoaded] = useState(false);

  //const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:9000/signins?day=" + dayOfWeek
      );
      const responseText = await response.json();
      console.log("fetchData dayOfWeek: " + dayOfWeek);
      console.log("fetchData Response: ");
      console.log(responseText);
      weeklyData[dayOfWeek] = responseText;
      console.log("fetchData Data loaded: ");
      console.log(weeklyData[dayOfWeek]);
      setLoaded(!dataLoaded);
      
      //setData(responseText);
      //console.log(data);
    } catch (err) {
      console.error(err);
      //setText(
      //  "Problem connecting to back-end server (Make sure to launch it on a different port!)"
      //);
    }
  }

  useMemo(() => {
    console.log("useEffect dayOfWeek: " + dayOfWeek);
    console.log("useEffect Loaded: " + dataLoaded);
    
    if(weeklyData[dayOfWeek] === null){
      //setLoaded(false);
      console.log("useEffect Data not Found!");
      console.log("useEffect before: ");
      console.log(weeklyData[dayOfWeek]);
      fetchData();
    }
    else{
      console.log("useEffect Data Found!");
    }
  });

    

  function switchDayGraph(day) {
    setDay(day);
    
    // return <GraphHours text={sample[day]} />;
  }
  return (
    <div className={classes.graphSelectRegion}>
      <ButtonBar onClick={switchDayGraph}/>
      <Card>{dayNameMap[dayOfWeek] && <GraphHours text={dayNameMap[dayOfWeek] + " Graph"} graphData={weeklyData[dayOfWeek]} />}</Card>
    </div>
  );
}

export default GraphSelection;
