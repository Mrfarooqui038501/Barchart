import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../services/api';

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff66', '#ff6666'],
      },
    ],
  });

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  const fetchPieChartData = async () => {
    try {
      const response = await api.get('/piechart', { params: { month } });
      const labels = response.data?.map((item) => item._id) || [];
      const data = response.data?.map((item) => item.count) || [];

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66ff66', '#ff6666'],
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching pie chart data', error);
    }
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default PieChart;
