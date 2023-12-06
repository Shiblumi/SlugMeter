import classes from "./GraphHours.module.css";
import { DAILY_ENTRY_MIN, DAILY_ENTRY_MAX } from "../../constants.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
ChartJS.register(MatrixController, MatrixElement);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  annotationPlugin,
  ChartDataLabels
);

function formatDate(date) {
  if (date instanceof Date && !isNaN(date)) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    // Ensure leading zeros for month and day
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedMonth}/${formattedDay}/${year}`;
  }

  // Handle cases where the date is not a valid Date object
  return 'Invalid Date';
}

let enableDataLabels = false;

function GraphMonth(props) {
    if(props.graphData.length == 0){
        return (
            <div className={classes.graphPositionOutline}>
              {props.text}
              <br></br>
              {props.dateString}
            </div>
          );
    }

  let week = 1;
  let dataArray = []
  let labels = [];

  
  for (let i = 0; i < props.graphData.length; i++) {
    let date = new Date(props.graphData[i].day);
    let count = props.graphData[i].count;

    let dayOfWeek = date.getDay() + 1;
    if (dayOfWeek == 1 && date.getDate() != 1) {
      week++;
    }
    dataArray.push({ x: dayOfWeek, y: week, signins: count });

    // Push formatted dates into the labels array
    labels.push(formatDate(date));
  }


  let ylabels = [];
  for(let y = week; y > 0; y--){
    ylabels.push(y);
  }

  const data = {
    datasets: [{
      data: dataArray,
      backgroundColor({raw}) {
        let val = (raw.signins) - DAILY_ENTRY_MIN * 0.5;
        if(val < 0){
          val = 0
        }
        const alpha = val / (DAILY_ENTRY_MAX - DAILY_ENTRY_MIN * 0.5);
        return 'rgb(18, 149, 216, ' + alpha + ')'
      },
      /*backgroundColor: 'rgba(18, 149, 216, 0.5)', */
      borderColor: '#66a6c8', 
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(255, 205, 0, 0.5)',
      hoverBorderColor: '#fae89ee9',
      width: ({chart}) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 3,
      height: ({chart}) =>(chart.chartArea || {}).height / chart.scales.y.ticks.length - 2.5,
      
    }]
  };

  const scales = {
    y: {
      display: false,
      type: 'category',
      labels: ylabels,
      left: 'left',
      offset: true,
    },
    x: {
      type: 'linear',
      position: 'top',
      offset: true,
      ticks: {
        callback: function (value) {
          // Custom callback to return day names for numeric values (1-7)
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return days[value - 1];
        },
        padding: 0,
        maxRotation: 0,
      },
      grid: {
        display: false,
        drawBorder: false,
      }
    }
  };



  const options = {
    plugins: {
      
      datalabels: {
        display: function (context) {
          if (!enableDataLabels) {
            return false;
          }
          const value = context.dataset.data[context.dataIndex];
          return value.signins !== undefined && value.signins > 0;
        },
        color: 'white', 
        font: {
          size: 18, 
        },
        formatter: function (value) {
          return value.signins !== undefined ? value.signins : ''; // Display 'signins' value on the graph
        }
      },
      
      tooltip: {
        displayColors: false,
        callbacks: {
          title() {
            return '';
          },
          label(context) {
            const date = labels[context.dataIndex]; // Using labels here
            return `${date}, Sign-ins: ${context.dataset.data[context.dataIndex].signins}`;
          }
        }
      }
    },
    scales: scales,
    layout: {
      padding: {
        top: 10,
      }
    },

  
  };

    

  return (
    <div className={classes.graphPositionOutline}>
      {props.text}
      <br></br>
      {props.dateString}
      <br></br>
      <Chart data={data} options={options} type={'matrix'}/>
    </div>
  );
}

export default GraphMonth;