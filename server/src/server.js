require("dotenv").config();
const connectdb = require("./config/db")

connectdb()

const app = require("./app");

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

});