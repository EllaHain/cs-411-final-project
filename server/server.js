// server.js

const connectToMongoDB = require('./app/db');
const app = require('./app/index');

// Establish MongoDB connection
connectToMongoDB()
  .then(() => {
    console.log('MongoDB connection established');

    // Start the server
    const port = process.env.PORT || 3088;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process with failure
  });








