import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Items',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  });

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await api.get('/barchart', { params: { month } });
      const labels = response.data?.map((item) => item._id) || [];
      const data = response.data?.map((item) => item.count) || [];

      setChartData({
        labels,
        datasets: [
          {
            label: 'Number of Items',
            data,
            backgroundColor: 'rgba(75,192,192,0.6)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching bar chart data', error);
    }
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default BarChart;
