require("dotenv").config(); // load .env variables

const app = require("./api/server");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

module.exports = app;