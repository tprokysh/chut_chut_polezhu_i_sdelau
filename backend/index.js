const express = require("express");
const path = require("path");
const pg = require("pg");
const client = require("./db");
const homeRoute = require("./routes/films");
const bodyParser = require("body-parser");

/**
 * Set your config!
 */

// const config = {
//   user: "postgres",
//   database: "films",
//   password: "postgres",
//   port: 5432
// };

// const pool = new pg.Pool(config);

const app = express();

// const hbs = exphbs.create({
//   defaultLayout: "main",
//   extname: "hbs"
// });

// app.engine("hbs", hbs.engine);
// app.set("view engine", "hbs");
// app.set("views", "views");
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express.static(path.join(__dirname, "public")));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", homeRoute);

//app.use(bodyParser.json());

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
