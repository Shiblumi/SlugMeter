// ChartComponent.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [lastHourTimestamps, setLastHourTimestamps] = useState([]);
  const [hourlyCounts, setHourlyCounts] = useState([]);

  useEffect(() => {
    // Call your API or functions to fetch data here
    // Example using fetch:
    fetch("/")
      .then((response) => response.json())
      .then((data) => {
        setLastHourTimestamps(data.lastHourTimestamps);
        setHourlyCounts(data.hourlyCounts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const lastHourData = {
    labels: ["Number of Items"],
    datasets: [
      {
        label: "Last Hour Timestamps Count",
        data: [lastHourTimestamps.length],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const hourlyCountsData = {
    labels: Array.from({ length: 16 }, (_, i) => `${i + 6}-${i + 7}`),
    datasets: [
      {
        label: "Hourly Counts",
        data: hourlyCounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Timestamps Charts</h1>
      <h2>Last Hour Chart</h2>
      <Bar data={lastHourData} />
      <h2>Hourly Counts Chart</h2>
      <Bar data={hourlyCountsData} />
    </div>
  );
};

export default BarChart;
