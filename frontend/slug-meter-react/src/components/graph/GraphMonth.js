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
import { Bar, Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
ChartJS.register(MatrixController, MatrixElement);


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  annotationPlugin
);


function median(arr) {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
  } else {
    return sortedArr[middle];
  }
}

function calculateQuartiles(arr) {
  let q1 = median(arr.slice(0, Math.floor(arr.length / 2)));
  let q2 = median(arr);
  let q3 = median(arr.slice(Math.ceil(arr.length / 2)));
  return [q1, q2, q3]
}
  

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

function currentTime() {
  let period = "am";
  let currentTime = new Date();
  let hour = currentTime.getHours();
  if (hour > 12) {
    hour -= 12;
    period = "pm";
  }

  return hour + " " + period;
} 

function GraphMonth(props) {

  let labels = [];
  let values = [];
  let quartiles = [];
  if (props.graphData != null) {
    for (let i = 0; i < props.graphData.length; i++) {
      const time = UTCtoLabelTime(props.graphData[i]["time"]);
      labels.push(time);
      values.push(props.graphData[i]["count"]);
    }
    quartiles = calculateQuartiles(values);
  }

  let colors = Array(labels.length).fill("rgba(18, 149, 216, 0.5)");
  colors[labels.indexOf(currentTime())] = 'rgb(255, 205, 0, 0.5)';

  
  let dataArray = []
  let date = new Date();
  console.log(date.getMonth());
  date.setDate(1);
  let month = date.getMonth();
  let week = 1
  while(date.getMonth() == month){
    console.log(date.toDateString());
    let dayOfWeek = date.getDay()+1;
    if(dayOfWeek == 1 && date.getDate() != 1){
        week++;
    }
    dataArray.push({x: dayOfWeek, y: week, signins: date.getDate()*10});
    date.setDate(date.getDate() + 1);
  }

  let ylabels = [];
  for(let y = week; y > 0; y--){
    ylabels.push(y);
  }

  let maxSignins = 2000;
  
  

  const data = {
    datasets: [{
      data: dataArray,
      backgroundColor({raw}) {
        const alpha = (raw.signins) / maxSignins;
        return 'rgb(255, 205, 0, ' + alpha + ')'
      },
      borderWidth: 1,
      hoverBackgroundColor: 'yellow',
      hoverBorderColor: 'yellowgreen',
      width: ({chart}) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 3,
      height: ({chart}) =>(chart.chartArea || {}).height / chart.scales.y.ticks.length - 3
    }]
  };

  const scales = {
    y: {
      type: 'category',
      labels: ylabels,
      left: 'left',
      offset: true,

      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
      title: {
        display: true,
        font: {size: 15, weigth: 'bold'},
        text: "Week",
        padding: 0
      }
    },
    x: {
      type: 'linear',
      position: 'top',
      offset: true,
      time: {
        unit: 'day',
        parser: 'i',
        isoWeekday: 1,
        displayFormats: {
          day: 'iiiiii'
        }
      },
      reverse: false,
      ticks: {
        source: 'data',
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
          legend: false,
          tooltip: {
            displayColors: false,
            callbacks: {
              title() {
                return '';
              },
              label(context) {
                const v = context.dataset.data[context.dataIndex];
                return v.signins;
              }
            }
          },
        },
        scales: scales,
        layout: {
          padding: {
            top: 10,
          }
        }
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

