import { useState, useEffect} from "react";
import GraphMonth from "./GraphMonth";
const {BACKEND_PORT, POLLING_INTERVAL} = require("../../constants.js");

function HeatMapMonth(props) {

    let date = new Date();
    const [data, setData] = useState([]);
    const [text, setText] = useState(props.text);

    async function fetchMonthlyData() {
      try {
        const request = "http://localhost:" + BACKEND_PORT + "/" + props.request + "?year=" + date.getFullYear() + "&month=" + date.getMonth();
        const response = await fetch(request);
        const responseJSON = await response.json();
        setData(responseJSON);
        
        } catch (err) {
          console.error(err);
          setText(
            "Problem connecting to back-end server (Make sure to launch it on a different port!)"
          );
        }
    }


    useEffect(() => {
      if(data.length == 0){
        fetchMonthlyData();
      }
    }, [data]);

    return (
          <GraphMonth text={text} graphData={data} dateString={props.dateString}/>
      );
}

  export default HeatMapMonth;