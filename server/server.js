// Import dependencies
const express = require('express');
// Import your server code from the JSX file
const login = require('./users/login.jsx');

// Create Express app
const app = express();

// Set up middleware, routes, etc.
// Example:
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
