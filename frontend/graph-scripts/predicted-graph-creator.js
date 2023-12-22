import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import fs from "fs";
import csv from "csv-parser";
import BarGraph from "./BarGraph";

function App({ csvFilePath }) {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
  });

  useEffect(() => {
    const xArray = [];
    const yArray = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        xArray.push(parseFloat(row.x));
        yArray.push(parseFloat(row.y));
      })
      .on("end", () => {
        console.log("Data read successfully.");
        console.log("X Array:", xArray);
        console.log("Y Array:", yArray);
        setChartData({
          labels: xArray,
          values: yArray,
        });
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error.message);
      });
  }, [csvFilePath]);

  return (
    <div>
      <h1>Bar Graph Example</h1>
      <BarGraph data={chartData} />
    </div>
  );
}

export default App;
