const express = require("express");
let app = express();

//middle wear settings]
const path = require("path");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const cookieParser = require("cookie-parser");
app.use(cookieParser("arigjwoeign"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.db = require("./db");

const filters = require("./filters");
filters(app);

let route = require("./routes");
route(app);

module.exports = app;