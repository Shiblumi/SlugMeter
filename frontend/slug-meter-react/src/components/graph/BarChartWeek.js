import { useState, useMemo } from "react";
import GraphHours from "./GraphHours";
const {BACKEND_PORT} = require("../../constants.js");

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

        const response = await fetch("http://localhost:" + BACKEND_PORT + "/" + props.request + "?year=" + date.getFullYear() + "&month=" + date.getMonth() + "&day=" + date.getDate());
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

    useMemo(() => {
        if(weeklyData[props.day] === null){
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