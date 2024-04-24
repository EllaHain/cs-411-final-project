// db.js
const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/userInfo';

// Function to establish MongoDB connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection function
module.exports = connectToMongoDB;
