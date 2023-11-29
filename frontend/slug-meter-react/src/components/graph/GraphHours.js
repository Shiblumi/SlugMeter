import classes from "./GraphHours.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
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
    scales: {
      x: {
        grid: {
          display: false,
        }
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
  

function UTCtoLabelTime(date) {
  let period = "am";
  let time = new Date(date);
  let hour = time.getHours();
  if (hour > 12) {
    hour -= 12;
    period = "pm";
  }

  return hour + " " + period;
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
        label: "Number of People",
        data: values,
        backgroundColor: "rgba(18, 149, 216, 0.5)",
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
