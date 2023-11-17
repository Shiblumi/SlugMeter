import classes from "./GraphHours.module.css";
import { useState } from 'react';

function GraphHours(props) {
  /* To-Do: Convert props.text (the day associated with the button) into a mongoDB call
       that gets hourly data for the passed-in day */

      //  const [text, setText] = useState([]);

      //  async function fetchData(){
      //   const response = await fetch('http://localhost:9000/signins');
      //   const responseText = await response.text()
      //   setText(responseText);
      // }
      //  fetchData();

      // return <div className={classes.graphPositionOutline}>{props.text}<br></br>{text}</div>;
      return <div className={classes.graphPositionOutline}>{props.text}</div>;
}

export default GraphHours;
