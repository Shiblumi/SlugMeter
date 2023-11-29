import { useState, useMemo, useEffect} from "react";
import GraphHours from "./GraphHours";
const {BACKEND_PORT, POLLING_INTERVAL} = require("../../constants.js");

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
    let date = new Date();
    let curDay = date.getDay();
    const [dataLoaded, setLoaded] = useState(false);
    const [text, setText] = useState(props.text);

    async function fetchWeeklyData() {
      try {
        
        const response = await fetch("http://localhost:" + BACKEND_PORT + "/" + props.request + "OfWeek?year=" + date.getFullYear() + "&month=" + date.getMonth() + "&day=" + date.getDate());
        const responseJSON = await response.json();

        for(let i = 6; i >= 0; i--){
          let day = responseJSON[i].day;
          weeklyData[day] = responseJSON[i].data;
              
        }
            setLoaded(!dataLoaded);
        } catch (err) {
          console.error(err);
          setText(
            "Problem connecting to back-end server (Make sure to launch it on a different port!)"
          );
        }
    }

    async function fetchDailyData() {
      try {
        const response = await fetch("http://localhost:" + BACKEND_PORT + "/" + props.request + "?year=" + date.getFullYear() + "&month=" + date.getMonth() + "&day=" + date.getDate());
        const responseJSON = await response.json();
        weeklyData[curDay] = responseJSON;
        setLoaded(!dataLoaded);

        } catch (err) {
          console.error(err);
          setText(
            "Problem connecting to back-end server (Make sure to launch it on a different port!)"
          );
        }
    }

    useEffect(() => {
      if(weeklyData[props.day] === null){
        fetchWeeklyData();
      }
      //Implementing the setInterval method
      const interval = setInterval(() => {
        fetchDailyData();
        console.log("Polling!");
      }, POLLING_INTERVAL);

      return () => clearInterval(interval);
    }, [dataLoaded]);


    return (
          <GraphHours text={text} graphData={weeklyData[dayOfWeek]} dateString={props.dateString}/>
      );
}

  export default BarChartWeek;