const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./config/connection");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");
const { checkToken } = require("./token.validation");

var app = express();
app.use(bodyParser.json());

app.use("/orders", checkToken, orderRoutes);
app.use("/user", authRoutes);

app.listen(3000);
