import classes from "./GraphHours.module.css";
import { useState } from 'react';

function GraphHours(props) {
  /* To-Do: Convert props.text (the day associated with the button) into a mongoDB call
       that gets hourly data for the passed-in day */

      const [text, setText] = useState([]);

       async function fetchData(){
        try{
          let today = new Date();
          let dayOfWeek = today.getDay();
          const response = await fetch('http://localhost:9000/signins?day=' + dayOfWeek);
          const responseText = await response.text()
          setText(responseText);
        }catch (err) {
        console.error(err);
        setText("Problem connecting to back-end server (Make sure to launch it on a different port!)");
        }
      }
       fetchData();

      return <div className={classes.graphPositionOutline}>{props.text}<br></br>{text}</div>;
}

export default GraphHours;
