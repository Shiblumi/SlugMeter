import React, { useState, useEffect } from "react";
import GraphMonth from "./GraphMonth";
import GraphHours from "./GraphHours";
const { BACKEND_PORT, POLLING_INTERVAL } = require("../../constants.js");

async function fetchData(date, request, setData, setTime, setText) {
  try {
    const requestURL =
      "http://localhost:" +
      BACKEND_PORT +
      "/" +
      request +
      "?year=" +
      date.getFullYear() +
      "&month=" +
      date.getMonth() +
      "&day=" +
      date.getDate();
    const response = await fetch(requestURL);
    const responseJSON = await response.json();
    setData(responseJSON);
    setTime(date.valueOf());
  } catch (err) {
    console.error(err);

    setText(
      "Problem connecting to back-end server (Make sure to launch it on a different port!)"
    );
  }
}

export function HeatMapMonth(props) {
  let date = new Date(props.time);
  const [data, setData] = useState([]);
  const [time, setTime] = useState(0);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    if (time != props.time) {
      fetchData(date, props.request, setData, setTime, setText);
    }
  }, [time, data, text, props.time]);

  return (
    <div style={{ margin: "5px" }}>
      <GraphMonth text={text} graphData={data} dateString={props.dateString} />
    </div>
  );
}

export function HistoricDayGraph(props) {
  let date = new Date(props.time);
  const [data, setData] = useState([]);
  const [time, setTime] = useState(0);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    if (time != props.time) {
      fetchData(date, props.request, setData, setTime, setText);
    }
  }, [time, data, text, props.time]);

  return (
    <GraphHours text={text} graphData={data} dateString={props.dateString} />
  );
}
