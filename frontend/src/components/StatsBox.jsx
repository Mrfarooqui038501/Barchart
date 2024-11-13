import React, { useEffect, useState } from 'react';
import api from '../services/api';

const StatsBox = ({ month }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    soldItemsCount: 0,
    notSoldItemsCount: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/statistics', { params: { month } });
      setStats(response.data || {});
    } catch (error) {
      console.error('Error fetching statistics', error);
    }
  };

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total Sale Amount: {stats.totalSaleAmount}</p>
      <p>Total Sold Items: {stats.soldItemsCount}</p>
      <p>Total Not Sold Items: {stats.notSoldItemsCount}</p>
    </div>
  );
};

export default StatsBox;
