import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ stats }) => {
  const chartData = {
    labels: ['Sold Items', 'Not Sold Items'],
    datasets: [
      {
        data: [stats.soldItemsCount, stats.notSoldItemsCount],
        backgroundColor: ['#FFCE56', '#FF6384'],
        borderWidth: 1,
        borderColor: '#ffffff',
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Transaction Categories</h2>
      <div className="bg-gray-50 p-4 rounded-lg" style={{ height: '400px' }}>
        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default PieChart;