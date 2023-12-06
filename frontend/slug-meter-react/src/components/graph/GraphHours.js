// Importing necessary styles and chart-related components from external modules
import classes from "./GraphHours.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

// Registering various chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  annotationPlugin
);

// Function to calculate the median of an array
function median(arr) {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
  } else {
    return sortedArr[middle];
  }
}

// Function to calculate quartiles of an array
function calculateQuartiles(arr) {
  let q1 = median(arr.slice(0, Math.floor(arr.length / 2)));
  let q2 = median(arr);
  let q3 = median(arr.slice(Math.ceil(arr.length / 2)));
  return [q1, q2, q3];
}

// Function to convert UTC time to a formatted label time
function UTCtoLabelTime(date) {
  let period = "am";
  let time = new Date(date);
  let hour = time.getHours();
  if (hour >= 12) {
    hour -= hour != 12 ? 12 : 0;
    period = "pm";
  }

  return hour + " " + period;
}

// Function to convert an array to a new array with every 4th element
function convertToFour(arr) {
  let fourArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 4 === 0) {
      fourArr.push(arr[i]);
    } else {
      fourArr.push("");
    }
  }
  return fourArr;
}

// Main functional component for rendering the bar chart
function GraphHours(props) {
  const [isLoading, setLoading] = useState(false);

  // Initializing arrays for labels, values, quartiles, and colors
  let labels = [];
  let values = [];
  let quartiles = [];

  // Populating labels and values arrays from props.graphData
  if (props.graphData != null) {
    for (let i = 0; i < props.graphData.length; i++) {
      const time = UTCtoLabelTime(props.graphData[i]["time"]);
      labels.push(time);
      values.push(props.graphData[i]["count"]);
    }
  }

  // Getting the current day
  const curDay = new Date().toDateString();

  // Initializing colors array with default color
  let colors = Array(labels.length).fill("rgba(18, 149, 216, 0.5)");

  // Highlighting current hour if the date matches the current day
  if (curDay === props.dateString) {
    let highlightedTime = new Date();
    highlightedTime.setHours(highlightedTime.getHours() + 1);
    let highlightedLabel = UTCtoLabelTime(highlightedTime);
    let index = labels.indexOf(highlightedLabel);
    colors[index] = "rgb(255, 205, 0, 0.5)";
    quartiles = calculateQuartiles(values.slice(0, index));
  } else {
    quartiles = calculateQuartiles(values);
  }

  // Converting labels array to show every 4th label
  labels = convertToFour(labels);

  // Configuration options for the chart
  const options = {
    responsive: true,
    layout: {
      padding: {
        right: 20,
      },
    },
    plugins: {
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: quartiles[0],
            yMax: quartiles[0],
            borderColor: "rgb(18, 149, 216)",
            borderWidth: 2,
          },
          line2: {
            type: "line",
            yMin: quartiles[2],
            yMax: quartiles[2],
            borderColor: "rgb(255, 205, 0)",
            borderWidth: 2,
          },
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            family: "Helvetica",
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
      },
    },
  };

  // Data object for the chart
  const data = {
    labels,
    datasets: [
      {
        label: "Number of People",
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  // Rendering the component with the bar chart
  if (!isLoading) {
    return (
      <div className={classes.graphPositionOutline}>
        <span
          style={{
            fontFamily: "Helvetica",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {props.text}
        </span>
        <br></br>
        <span style={{ fontFamily: "Helvetica", fontSize: "16px" }}>
          {props.dateString}
        </span>
        <br></br>
        <Bar data={data} options={options} />
      </div>
    );
  } else {
    return <Skeleton height={300} width={600} />;
  }
}

// Exporting the component as the default export
export default GraphHours;
