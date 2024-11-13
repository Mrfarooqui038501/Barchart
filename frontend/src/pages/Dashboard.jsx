import React, { useState } from 'react';
import TransactionsTable from '../components/TransactionsTable';
import StatsBox from '../components/StatsBox';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { Chart, CategoryScale, LinearScale, ArcElement, BarElement } from 'chart.js';


Chart.register(CategoryScale, LinearScale, ArcElement, BarElement);

const Dashboard = () => {
  const [month, setMonth] = useState('03'); 

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <div className="stats-charts-wrapper">
        <StatsBox month={month} />
        <TransactionsTable month={month} />
      </div>

      <div className="stats-charts-wrapper">
        <BarChart month={month} />
        <PieChart month={month} />
      </div>
    </div>
  );
};

export default Dashboard;
