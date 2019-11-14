const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
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

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoute);
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

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
