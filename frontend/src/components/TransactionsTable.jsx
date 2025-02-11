import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ month, year, onStatsUpdate, onDateChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const itemsPerPage = 10;

  const years = Array.from({ length: 4 }, (_, i) => (2024 - i).toString());

  useEffect(() => {
    fetchTransactions();
  }, [page, search, selectedMonth, selectedYear]);

  const calculateStats = (transactionsData) => {
    const soldItems = transactionsData.filter(t => t.sold);
    const totalSaleAmount = soldItems.reduce((sum, t) => sum + t.price, 0);
    
    return {
      totalSaleAmount: totalSaleAmount.toFixed(2),
      soldItemsCount: soldItems.length,
      notSoldItemsCount: transactionsData.length - soldItems.length
    };
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: { month: selectedMonth, year: selectedYear, page, search }
      });
      const transactionsData = response.data.transactions || [];
      setTransactions(transactionsData);
      setTotalPages(response.data.totalPages || 1);
      
      // Calculate and update stats
      const newStats = calculateStats(transactionsData);
      onStatsUpdate(newStats);
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    onDateChange(newMonth, selectedYear);
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    onDateChange(selectedMonth, newYear);
  };

  return (
    <div className="w-full bg-yellow-200">
      <div className="p-6 border-b-2 border-black">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-grow md:max-w-md">
            <input
              type="text"
              placeholder="Search by title, description, or price..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border-2 border-orange-400 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                       transition-colors placeholder-orange-400 bg-white
                       shadow-md"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-3 border-2 border-orange-400 rounded-lg text-orange-800
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                       transition-colors bg-white cursor-pointer
                       shadow-md hover:shadow-lg"
            >
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

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-3 border-2 border-orange-400 rounded-lg text-orange-800
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                       transition-colors bg-white cursor-pointer
                       shadow-md hover:shadow-lg"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full border-2 border-black">
          <thead>
            <tr className="bg-yellow-300">
              <th className="p-4 text-left font-semibold text-black border-2 border-black">ID</th>
              <th className="p-4 text-left font-semibold text-black border-2 border-black">Title</th>
              <th className="p-4 text-left font-semibold text-black border-2 border-black">Description</th>
              <th className="p-4 text-left font-semibold text-black border-2 border-black">Price</th>
              <th className="p-4 text-left font-semibold text-black border-2 border-black">Category</th>
              <th className="p-4 text-left font-semibold text-black border-2 border-black">Sold</th>
              <th className="p-4 text-left font-semibold text-black border-2 border-black">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="border-2 border-black hover:bg-yellow-100 transition-colors">
                <td className="p-4 text-black border-2 border-black">{transaction._id}</td>
                <td className="p-4 text-black border-2 border-black">{transaction.title}</td>
                <td className="p-4 text-black border-2 border-black">{transaction.description}</td>
                <td className="p-4 text-black border-2 border-black">${transaction.price}</td>
                <td className="p-4 text-black border-2 border-black">{transaction.category}</td>
                <td className="p-4 border-2 border-black">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    transaction.sold 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.sold ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-4 border-2 border-black">
                  <img 
                    src={transaction.image} 
                    alt={transaction.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-6 border-t-2 border-black">
        <span className="text-black font-medium">
          Page {page} of {totalPages}
        </span>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setPage(page - 1)} 
            disabled={page === 1}
            className="px-6 py-2 rounded-lg font-medium transition-all
                     bg-orange-500 text-white
                     hover:bg-orange-600 active:bg-orange-700
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg cursor-pointer
                     border-2 border-orange-600"
          >
            Previous
          </button>
          
          <button 
            onClick={() => setPage(page + 1)} 
            disabled={page === totalPages}
            className="px-6 py-2 rounded-lg font-medium transition-all
                     bg-orange-500 text-white
                     hover:bg-orange-600 active:bg-orange-700
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg cursor-pointer
                     border-2 border-orange-600"
          >
            Next
          </button>
        </div>

        <span className="text-black font-medium">
          {itemsPerPage} items per page
        </span>
      </div>
    </div>
  );
};

export default TransactionsTable;