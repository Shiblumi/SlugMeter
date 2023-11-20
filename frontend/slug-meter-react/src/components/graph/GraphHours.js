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
import faker from 'faker';
import { useState } from "react";

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
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function GraphHours(props) {
  /* To-Do: Convert props.text (the day associated with the button) into a mongoDB call
       that gets hourly data for the passed-in day */

  const [text, setText] = useState([]);

  async function fetchData() {
    try {
      let today = new Date();
      let dayOfWeek = today.getDay();
      const response = await fetch(
        "http://localhost:9000/signins?day=" + dayOfWeek
      );
      const responseText = await response.text();
      setText(responseText);
    } catch (err) {
      console.error(err);
      setText(
        "Problem connecting to back-end server (Make sure to launch it on a different port!)"
      );
    }
  }
  fetchData();

  return (
    <div className={classes.graphPositionOutline}>
      {props.text}
      <br></br>
      {text}
      <br></br>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraphHours;
