const Transaction = require('../models/Transaction');
const axios = require('axios');

// Seed Database
exports.seedDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.THIRD_PARTY_API_URL);
    await Transaction.deleteMany(); 
    await Transaction.insertMany(data);
    res.status(201).json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error seeding database' });
  }
};

// Get Transactions 
exports.getTransactions = async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;
  const startDate = new Date(`2022-${month}-01`); 
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const query = {
    dateOfSale: { $gte: startDate, $lt: endDate },
  };
  
    console.log(search)
  if (search) {

    console.log(search);
    
    query.$or = [
    
    { title: new RegExp(search, 'i') }, 
    
    { description: new RegExp(search, 'i') }, 
    
    ];
     if(!(typeof search !== 'number' || isNaN(search))){
      
      query.$or.push({ price: Number(search) });
     } 
}
console.log(query)

  try {
    
    const transactions = await Transaction.find(query)
    
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    const total = await Transaction.countDocuments(query);
    

    res.json({
      transactions,
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

// Get Statistics 
exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  try {
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]);

    const soldItemsCount = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: true,
    });

    const notSoldItemsCount = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      soldItemsCount,
      notSoldItemsCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
};

// Get Bar Chart Data 
exports.getBarChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  try {
    const priceRanges = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
          default: '901-above',
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bar chart data' });
  }
};

// Get Pie Chart Data 
exports.getPieChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2022-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  try {
    const categories = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pie chart data' });
  }
};

// Get Combined Data 
exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const statistics = await this.getStatistics(req, res);
    const barChart = await this.getBarChart(req, res);
    const pieChart = await this.getPieChart(req, res);

    res.json({
      statistics,
      barChart,
      pieChart,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching combined data' });
  }
};
