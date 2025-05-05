import React from "react";
import { Line } from "react-chartjs-2";

export const StatisticsChart = ({ title, data, labels, footer }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <Line data={chartData} />
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
};
