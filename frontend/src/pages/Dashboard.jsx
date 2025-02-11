import React, { useState } from 'react';
import TransactionsTable from '../components/TransactionsTable';
import StatsBox from '../components/StatsBox';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { Chart, CategoryScale, LinearScale, ArcElement, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, ArcElement, BarElement);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    soldItemsCount: 0,
    notSoldItemsCount: 0,
  });
  const [month, setMonth] = useState('03');
  const [year, setYear] = useState('2021');

  const handleStatsUpdate = (newStats) => {
    setStats(newStats);
  };

  const handleDateChange = (newMonth, newYear) => {
    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Transaction Dashboard</h1>
          <p className="text-indigo-600">Monitor and manage your transactions</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold text-indigo-900 mb-4">Statistics</h3>
          <StatsBox stats={stats} />
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100">
          <TransactionsTable 
            month={month} 
            year={year} 
            onStatsUpdate={handleStatsUpdate}
            onDateChange={handleDateChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Transaction Trends</h3>
            <BarChart stats={stats} />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Distribution</h3>
            <PieChart stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;