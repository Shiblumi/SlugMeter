import React, { useState, useEffect } from "react";
import GraphMonth from "./GraphMonth";
const { BACKEND_PORT } = require("../../constants.js");

function HeatMapMonth(props) {
  const [data, setData] = useState([]);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    async function fetchMonthlyData() {
      try {
        const date = new Date(); // Current date
        const request = `http://localhost:${BACKEND_PORT}/${props.request}?year=${date.getFullYear()}&month=${date.getMonth()}`;
        const response = await fetch(request);
        const responseJSON = await response.json();
        
        console.log(responseJSON); // Log fetched data
        
        setData(responseJSON);
      } catch (err) {
        console.error(err);
        setText(
          "Problem connecting to the back-end server. Make sure to launch it on a different port."
        );
      }
    }
  
    if (data.length === 0) {
      fetchMonthlyData();
    }
  }, [data]); 

  return (
    <div style={{ margin: '5px' }}>
    <GraphMonth text={text} graphData={data} dateString={props.dateString} />
    </div>
  );
}

export default HeatMapMonth;
