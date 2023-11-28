import classes from "./GraphHours.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

function UTCtoLabelTime(date){
  let period = "am"
  let time = new Date(date);
  let minute = time.getMinutes();
  if(minute < 10){
    minute = "0" + minute;
  }
  let hour = time.getHours();
  if(hour > 12){
    hour -= 12;
    period = "pm"
  }
  

  return hour + ":" + minute + " " + period;
}

function GraphHours(props) {
  /* To-Do: Convert props.text (the day associated with the button) into a mongoDB call
       that gets hourly data for the passed-in day */

  

  let labels = [];
  let values = [];
  if(props.graphData != null){
    for(let i = 0; i < props.graphData.length; i++){
      const time = UTCtoLabelTime(props.graphData[i]["time"]);
      labels.push(time);
      values.push(props.graphData[i]["count"]);
    }
  }
  console.log("GraphHours labels:");
  console.log(labels);
  console.log("GraphHours values:");
  console.log(values);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div className={classes.graphPositionOutline}>
      {props.text}
      <br></br>
      <br></br>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraphHours;
