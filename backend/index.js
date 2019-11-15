const express = require("express");
const path = require("path");
const homeRoute = require("./routes/films");
const bodyParser = require("body-parser");

const app = express();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use("/", homeRoute);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
