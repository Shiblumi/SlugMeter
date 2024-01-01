import { useState, useEffect } from "react";
import GraphHours from "./GraphHours";
const { BACKEND_PORT, POLLING_INTERVAL } = require("../../constants.js");

function BarChartWeek(props) {
  let dayOfWeek = props.day;
  let date = new Date();
  let curDay = date.getDay();
  const [data, setData] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });
  const [text, setText] = useState(props.text);

  date.setHours(date.getHours() + 8);

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

      console.log(`Request: ${request}`);

      console.log(`Request: ${request}`);

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
        console.log(`${day} data: ${JSON.stringify(weeklyData[day])}`);
      }

      setData(weeklyData);
    } catch (err) {
      console.error(err);
      setText(
        "Problem connecting to back-end server (Make sure to launch it on a different port!)"
      );
    }
  }

  useEffect(() => {
    if (data[curDay] == null) {
      fetchWeeklyData();
    }
    //Implementing the setInterval method
    const interval = setInterval(() => {
      fetchWeeklyData();
      console.log("Polling!");
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <GraphHours
      text={text}
      graphData={data[dayOfWeek]}
      dateString={props.dateString}
      showAverageLine={props.showAverageLine}
      showAverageValue={props.showAverageValue}
    />
  );
}

export default BarChartWeek;
