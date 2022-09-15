const db = require("../model");
const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
const { indicators } = require("../model");

//create main model
const Indicator = db.indicators;

//global variables
let tableData = [];

//handlers
const setIndicatorsData = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let reqpath = path.join(__basedir, "..", "/resources/", req.file.filename);
    const workbook = xlsx.readFile(reqpath);
    let data = await indicators.findAll();
    let post = {};

    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (
          cellAsString[1] !== "r" &&
          cellAsString[1] !== "m" &&
          cellAsString[1] > 1
        ) {
          if (cellAsString[0] === "C") {
            post.name = worksheet[cell].v;
            if (
              !post.name.startsWith("Total") &&
              !post.name.startsWith("TOTAL") &&
              post.name !== undefined &&
              tableData.findIndex((obj) => obj.name === post.name) === -1 &&
              data.findIndex((obj) => obj.name === post.name) === -1
            ) {
              tableData.push(post);
              post = {};
            }
          }
        }
      }
    });
    setData(req, res);
    // console.log(indicators);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const setTaxanomyData = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

const setData = async (req, res) => {
  try {
    await Indicator.bulkCreate(tableData);
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (error) {
    res.status(500).send({
      message: "Fail to import data into database!",
      error: error.message,
    });
  }
};

const getIndicators = async (req, res) => {
  try {
    let data = await indicators.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving Indicators.",
    });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resources/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes =
      /.xlsx|vnd.openxmlformats-officedocument.spreadsheetml.sheet/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("file");

module.exports = {
  upload,
  setIndicatorsData,
  getIndicators,
};
