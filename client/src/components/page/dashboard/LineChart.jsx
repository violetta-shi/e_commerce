import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

export default function AreaChart() {
  const data = {
    labels: ["Ноя 03", "Ноя 10", "Ноя 17", "Ноя 24"],
    datasets: [
      { label: "Desktop", data: [2.3, 1.9, 2.2, 2.9], backgroundColor: "rgba(106, 13, 173, 0.5)", fill: true },
      { label: "Mobile", data: [2.1, 1.9, 2.1, 2.5], backgroundColor: "rgba(75, 0, 127, 0.5)", fill: true },
    ],
  };

  const options = { responsive: true, plugins: { legend: { position: "top" } } };

  return <Line data={data} options={options} />;
}
