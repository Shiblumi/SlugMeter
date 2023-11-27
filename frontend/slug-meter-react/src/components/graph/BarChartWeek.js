import { useState, useMemo } from "react";
import GraphHours from "./GraphHours";

let weeklyData = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  }

function BarChartWeek(props) {
    let dayOfWeek = props.day;
    const [dataLoaded, setLoaded] = useState(false);
    const [text, setText] = useState(props.text);

    async function fetchData() {
        try {
          let date = new Date();
          let curDay = date.getDay();
          const dayOffset = -1* ((curDay + 7 - dayOfWeek) % 7);
          date.setDate(date.getDate() + dayOffset);
    
          const response = await fetch("http://localhost:9000/" + props.request + "?year=" + date.getFullYear() + "&month=" + date.getMonth() + "&day=" + date.getDate());
          const responseText = await response.json();
    
          weeklyData[dayOfWeek] = responseText;
          setLoaded(!dataLoaded);
          
        } catch (err) {
          console.error(err);
          setText(
            "Problem connecting to back-end server (Make sure to launch it on a different port!)"
          );
        }
    }

    useMemo(() => {
        console.log("useEffect dayOfWeek: " + props.day);
        console.log("useEffect Loaded: " + dataLoaded);
        
        if(weeklyData[props.day] === null){
          //setLoaded(false);
          console.log("useEffect Data not Found!");
          console.log("useEffect before: ");
          console.log(weeklyData[props.day]);
          fetchData();
        }
        else{
          console.log("useEffect Data Found!");
        }
      });

    return (
          <GraphHours text={text} graphData={weeklyData[dayOfWeek]} />
      );
}



  export default BarChartWeek;