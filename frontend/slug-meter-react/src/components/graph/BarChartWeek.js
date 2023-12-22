import { useState, useEffect } from "react";
import GraphHours from "./GraphHours";
const { BACKEND_PORT, POLLING_INTERVAL } = require("../../constants.js");

//BarChartWeek holds logic and storage for all data retrieved from the backend
function BarChartWeek(props) {
  let dayOfWeek = props.day;
  let date = new Date();
  let curDay = date.getDay();
  const [text, setText] = useState(props.text);

  //Data is stored in a map corresponding to each day of the week.
  //This is so data doesn't need to be fetched whenever a user presses a button
  const [data, setData] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });

  //Calls the backend and stores data in a new map
  async function fetchWeeklyData() {
    try {
      const request =
        "http://localhost:" +
        BACKEND_PORT +
        "/" +
        props.request +
        "?year=" +
        date.getFullYear() +
        "&month=" +
        date.getMonth() +
        "&day=" +
        date.getDate();
      const response = await fetch(request);
      const responseJSON = await response.json();

      let weeklyData = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
      };

      for (let i = 6; i >= 0; i--) {
        let day = responseJSON[i].day;
        weeklyData[day] = responseJSON[i].data;
      }
      setData(weeklyData);
    } catch (err) {
      console.error(err);
      setText(
        "Problem connecting to back-end server (Make sure to launch it on a different port!)"
      );
    }
  }

  //useEffect is called on any render
  useEffect(() => {
    //if no data is loaded yet, fetches it
    if (data[curDay] == null) {
      fetchWeeklyData();
    }
    //Sets an interval that calls fetchWeeklyData() every POLLING_INTERVAL ms.
    const interval = setInterval(() => {
      fetchWeeklyData();
      console.log("Polling!");
    }, POLLING_INTERVAL);
    //returns a function that cleans up the interval
    return () => clearInterval(interval);
    //passes data as a dependancy of useEffect
  }, [data]);

  return (
    <GraphHours
      text={text}
      graphData={data[dayOfWeek]}
      dateString={props.dateString}
    />
  );
}

export default BarChartWeek;
