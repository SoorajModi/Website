require("dotenv").config();
const source = require("rfr");
const app = source('app');

let port = process.env.PORT;            // Required for Heroku hosting
if (port == null || port === "") {
  port = 8008;
}

app.listen(port, function() {
  console.log("Server started on port " + port);
});
