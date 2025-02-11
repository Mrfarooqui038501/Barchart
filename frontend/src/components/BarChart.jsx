import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ stats }) => {
  const chartData = {
    labels: ['Sold Items', 'Not Sold Items'],
    datasets: [
      {
        label: 'Number of Items',
        data: [stats.soldItemsCount, stats.notSoldItemsCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default BarChart;