// index.js
// require("dotenv").config();
const app = require("./app");
const cornjob = require("./jobs/cornjob");
const PORT = 3000;

app.listen(PORT, () => {
  cornjob.start();
  console.log(`🚀 Server is running on port ${PORT}`);
});
