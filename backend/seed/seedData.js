const mongoose = require('mongoose');
const axios = require('axios');
const Transaction = require('../models/Transaction');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    
    const { data } = await axios.get(process.env.THIRD_PARTY_API_URL);

   
    await Transaction.deleteMany({});
    console.log('Cleared existing data from Transaction collection');

   
    await Transaction.insertMany(data);
    console.log('Database seeded successfully with new data');

   
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
