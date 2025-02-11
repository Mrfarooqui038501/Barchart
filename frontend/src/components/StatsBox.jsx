import React from 'react';

const StatsBox = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
        <h4 className="text-lg font-semibold text-green-800">Total Sale Amount</h4>
        <p className="text-xl font-bold text-green-600">${stats.totalSaleAmount}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
        <h4 className="text-lg font-semibold text-blue-800">Total Sold Items</h4>
        <p className="text-xl font-bold text-blue-600">{stats.soldItemsCount}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
        <h4 className="text-lg font-semibold text-red-800">Total Not Sold Items</h4>
        <p className="text-xl font-bold text-red-600">{stats.notSoldItemsCount}</p>
      </div>
    </div>
  );
};

export default StatsBox;