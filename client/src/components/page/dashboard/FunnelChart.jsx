import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const FunnelChart = () => {
  const data = {
    labels: [
      "basketViewNew",
      "ecom_addToCart",
      "begin_checkout",
      "add_shipping_info",
      "add_payment_info",
      "ecom_purchase",
    ],
    datasets: [
      {
        label: "Конверсия шагов в корзине",
        data: [1775319, 1320750, 356030, 283105, 241667, 227769],
        backgroundColor: [
          "#6a5acd",
          "#6a5acd",
          "#8470ff",
          "#8470ff",
          "#ba55d3",
          "#ba55d3",
        ],
        borderColor: "#fff",
        borderWidth: 1,
        barThickness: 50, // Толщина столбцов
      },
    ],
  };

  const options = {
    indexAxis: "y", // Горизонтальная ориентация
    plugins: {
      legend: {
        display: false, // Скрыть легенду
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = data.datasets[0].data[0];
            const currentValue = context.raw;
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${currentValue.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString(), // Формат чисел
        },
      },
      y: {
        ticks: {
          color: "#000", // Цвет текста
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div style={{ width: "600px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "left", color: "#333" }}>
        Конверсия шагов в Корзине
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FunnelChart;
