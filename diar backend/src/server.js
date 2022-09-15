const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

let corOption = {
  origin: "https://localhost:3000",
};

global.__basedir = __dirname + "";

//middlewares

app.use(cors(corOption));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//routers
const router = require("./routes/peopleRoute");
app.use("/api/people", router);


//testing api

app.get("/", (req, res) => {
  res.json({
    message: "Api is up",
  });
});

//port

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
