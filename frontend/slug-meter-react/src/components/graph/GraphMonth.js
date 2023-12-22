import classes from "./GraphHours.module.css";
import {DAILY_ENTRY_MIN, DAILY_ENTRY_MAX} from "../../constants.js";
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

  
  for(let i = 0; i < props.graphData.length; i++){
    let date = new Date(props.graphData[i].day);
    let count = props.graphData[i].count;

    let dayOfWeek = date.getDay() + 1;
    if(dayOfWeek == 1 && date.getDate() != 1){
        week++;
    }
    dataArray.push({x: dayOfWeek, y: week, signins: count});
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

