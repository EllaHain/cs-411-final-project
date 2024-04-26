const app = require("./app/index")
// Start server
const PORT = process.env.PORT || 3088; // Set your desired port here
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});