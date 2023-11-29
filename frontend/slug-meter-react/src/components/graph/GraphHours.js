import classes from "./GraphHours.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

  // const avgHighLine = {
  //   id: "avgHighLine",
  //   afterDatasetsDraw(chart, args, pluginOptions) {
  //     const {
  //       ctx,
  //       chartArea: { top, bottom, left, right, width, height },
  //       scales: { x, y },
  //     } = chart;

  //     ctx.save();
  //     ctx.beginPath();
  //     ctx.moveTo(left, y.getPixelForValue(80));
  //     ctx.lineTo(right, y.getPixelForValue(80));
  //     ctx.stroke();
  //   },
  // };

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: 80,
          yMax: 80,
          borderColor: 'rgb(255, 110, 27)',
          borderWidth: 2,
        },
        line2: {
          type: 'line',
          yMin: 20,
          yMax: 20,
          borderColor: 'rgb(18, 149, 216)',
          borderWidth: 2,
        },
      },
    },
  },
};

function UTCtoLabelTime(date) {
  let period = "am";
  let time = new Date(date);
  let minute = time.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let hour = time.getHours();
  if (hour > 12) {
    hour -= 12;
    period = "pm";
  }

  return hour + ":" + minute + " " + period;
}

function GraphHours(props) {
  let labels = [];
  let values = [];
  if (props.graphData != null) {
    for (let i = 0; i < props.graphData.length; i++) {
      const time = UTCtoLabelTime(props.graphData[i]["time"]);
      labels.push(time);
      values.push(props.graphData[i]["count"]);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={classes.graphPositionOutline}>
      {props.text}
      <br></br>
      {props.dateString}
      <br></br>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraphHours;
