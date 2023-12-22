// BarGraph.js
import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ data }) => {
  const chartData = {
    labels: data.labels, // Array of labels for each bar
    datasets: [
      {
        label: "Hours",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: data.values, // Array of data values
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default BarGraph;
