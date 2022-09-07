const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection")
const peopleRoutes = require("../routes/people")


var app = express();
app.use(bodyParser.json());

app.use("/people", peopleRoutes)

app.listen(3004);