const db = require("../model");
const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");

//create main model
const Indicator = db.indicators;
const Taxonomies = db.taxonomies;
const Development = db.developments;
const UltimateField = db.ultimateFields;
const Governances = db.governances;
const Countries = db.countries;
const QuestionMaster = db.questionMaster;
const Questions = db.questions;
const Ndhs = db.ndhs;
//global variables
let tableData = [];
let govenanceTableData = [];
let ultimateTableData = [];
let indicatorTableData = [];
let taxonomyTableData = [];
let questionMasterTableData = [];
let questionTableData = [];
let ndhsTableData = [];

//handlers

const getCountriesData = () => {
  try {
    let reqpath =
      "/home/chirag/Node-js/diar backend/resources/static-files/countries.csv";
    const workbook = xlsx.readFile(reqpath);
    let post = {};

    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (cellAsString[1] > 1) {
          if (cellAsString[0] === "A") {
            post.id = worksheet[cell].v;
          }
          if (cellAsString[0] === "B") {
            post.name = worksheet[cell].v.trim();
          }
          if (cellAsString[0] === "C") {
            post.iso_code = worksheet[cell].v;
          }
          if (cellAsString[0] === "D") {
            post.flag_path = worksheet[cell].v;
          }
          if (cellAsString[0] === "E") {
            post.lat = worksheet[cell].v;
          }
          if (cellAsString[0] === "F") {
            post.lng = worksheet[cell].v;
          }
          post.taxonomy_score = 100;
          if (
            post.name !== undefined &&
            post.id !== undefined &&
            post.iso_code !== undefined &&
            post.flag_path !== undefined &&
            post.lat !== undefined &&
            post.lng !== undefined &&
            tableData.findIndex((obj) => obj.name === post.name) === -1
            // data.findIndex((obj) => obj.name === post.name) === -1
          ) {
            tableData.push(post);
            post = {};
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getDevelopmentType = async () => {
  let data = await Development.findAll();
  let developmentType = [
    { name: "Present Development" },
    { name: "Prospective Development" },
  ];
  if (data.length === 0) {
    Development.bulkCreate(developmentType);
  }
};

const getGovernanceType = (req) => {
  try {
    let reqpath = path.join(__basedir, "..", "/resources/", req.file.filename);
    const workbook = xlsx.readFile(reqpath);
    // let apiData = await Governances.findAll();
    let post = {};
    let data = [];
    // apiData.forEach((element) => {
    //   data.push(element.dataValues);
    // });
    workbook.SheetNames.forEach((element) => {
      post.name = element;
      if (
        post.name !== undefined &&
        govenanceTableData.findIndex((obj) => obj.name === post.name) === -1
      ) {
        govenanceTableData.push(post);
        post = {};
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getUltimateField = (req) => {
  try {
    let reqpath = path.join(__basedir, "..", "/resources/", req.file.filename);
    const workbook = xlsx.readFile(reqpath);
    // let apiData = await UltimateField.findAll();
    let post = {};
    // let data = [];
    // apiData.forEach((element) => {
    //   data.push(element.dataValues);
    // });
    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (cellAsString[1] > 1) {
          if (cellAsString[0] === "A") {
            post.name = worksheet[cell].v.trim();
            if (post.name === "Readiness" || post.name === "Availability") {
              post.development_types_id = 1;
            } else {
              post.development_types_id = 2;
            }
            if (
              post.name !== undefined &&
              ultimateTableData.findIndex((obj) => obj.name === post.name) ===
                -1
              // data.findIndex((obj) => obj.name === post.name) === -1
            ) {
              ultimateTableData.push(post);
              post = {};
            }
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getIndicatorsData = (req) => {
  try {
    let reqpath = path.join(__basedir, "..", "/resources/", req.file.filename);
    const workbook = xlsx.readFile(reqpath);
    // let apiData = await Indicator.findAll();
    let post = {};
    // let data = [];
    // apiData.forEach((element) => {
    //   data.push(element.dataValues);
    // });
    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (cellAsString[1] > 1) {
          if (cellAsString[0] === "C") {
            post.name = worksheet[cell].v;
            if (
              !post.name.startsWith("Total") &&
              !post.name.startsWith("TOTAL") &&
              post.name !== undefined &&
              indicatorTableData.findIndex((obj) => obj.name === post.name) ===
                -1
              // data.findIndex((obj) => obj.name === post.name) === -1
            ) {
              indicatorTableData.push(post);
              post = {};
            }
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getTaxanomyData = (req) => {
  try {
    let reqpath = path.join(__basedir, "..", "/resources/", req.file.filename);
    const workbook = xlsx.readFile(reqpath);
    // let fetchData = await Taxonomies.findAll();
    // let data = [];
    let post = {};
    // fetchData.forEach((element) => {
    //   data.push(element.dataValues);
    // });
    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        if (element === "General health IT AI") {
          post.governance_id = 1;
        } else {
          post.governance_id = 2;
        }
        const cellAsString = cell.toString();
        if (cellAsString[1] > 1) {
          if (cellAsString[0] === "B") {
            post.name = worksheet[cell].v.trim();
          }
          post.taxonomy_score = 100;
          if (
            post.taxonomy_score !== undefined &&
            post.name !== undefined &&
            !post.name.endsWith("(100)") &&
            taxonomyTableData.findIndex((obj) => obj.name === post.name) === -1
            // data.findIndex((obj) => obj.name === post.name) === -1
          ) {
            taxonomyTableData.push(post);
            post = {};
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getQuestionMaster = (req) => {
  try {
    let reqpath = path.join(__basedir, "..", "/resources/", req.file.filename);
    const workbook = xlsx.readFile(reqpath);
    let post = {};
    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        // const cellAsString = cell.toString();
        console.log(cellAsString);
        if (cellAsString[1] >= 1) {
          if (cellAsString[0] === "D") {
            post.name = worksheet[cell].v;
            // console.log(post.name);
            if (post.name !== undefined && post.name !== 100) {
              let pattern = /[(]+[\d]*[)]+/;
              let result = post.name.search(pattern);
              if (result !== -1) {
                post.name = post.name.substr(0, result - 1);
              }
            }
            if (
              post.name !== undefined &&
              post.name !== 100 &&
              questionMasterTableData.findIndex(
                (obj) => obj.name === post.name
              ) === -1
              // data.findIndex((obj) => obj.name === post.name) === -1
            ) {
              questionMasterTableData.push(post);
              post = {};
            }
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getQuestionsData = (req) => {
  try {
    let reqpath = path.join(__basedir, "..", "/resources/", req.file.filename);
    const workbook = xlsx.readFile(reqpath);
    let indicatorData = indicatorTableData;
    let taxanomiesData = taxonomyTableData;
    let ufData = ultimateTableData;
    let quesData = questionMasterTableData;
    let post = {};
    let uf = "";
    let taxo = "";
    let indi = "";
    let qm = "";
    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (cellAsString[1] > 1) {
          if (cellAsString[0] === "A") {
            uf = worksheet[cell].v;
            if (ufData.findIndex((obj) => obj.name === uf) !== -1) {
              post.ultimate_fields_id =
                ufData.findIndex((obj) => obj.name === uf) + 1;
            }
            if (uf === "Readiness" || uf === "Availability") {
              post.development_types_id = 1;
            } else {
              post.development_types_id = 2;
            }
          }
          if (cellAsString[0] === "B") {
            taxo = worksheet[cell].v.trim();
            if (taxanomiesData.findIndex((obj) => obj.name === taxo) !== -1) {
              post.taxonomy_id =
                taxanomiesData.findIndex((obj) => obj.name === taxo) + 1;
            }
          }
          if (cellAsString[0] === "C") {
            indi = worksheet[cell].v;
            if (
              !indi.startsWith("Total") &&
              !indi.startsWith("TOTAL") &&
              indicatorData.findIndex((obj) => obj.name === indi) !== -1
            ) {
              post.indicator_id =
                indicatorData.findIndex((obj) => obj.name === indi) + 1;
            }
          }
          if (cellAsString[0] === "D") {
            qm = worksheet[cell].v;
            if (qm !== undefined && qm !== 100) {
              let pattern = /[(]+[\d]*[)]+/;
              let result = qm.search(pattern);
              if (result !== -1) {
                qm = qm.substr(0, result - 1);
              }
            }
            if (
              !indi.startsWith("Total") &&
              !indi.startsWith("TOTAL") &&
              quesData.findIndex((obj) => obj.name === qm) !== -1
            ) {
              post.question_id =
                quesData.findIndex((obj) => obj.name === qm) + 1;
            }
          }
          if (cellAsString[0] === "E") {
            if (!indi.startsWith("Total") && !indi.startsWith("TOTAL")) {
              post.question_score = worksheet[cell].v;
            }
            post.indicator_score = 100;
            if (
              post.ultimate_fields_id !== undefined &&
              post.question_score !== undefined &&
              post.indicator_id !== undefined &&
              post.taxonomy_id !== undefined &&
              post.question_id !== undefined &&
              questionTableData.findIndex(
                (obj) =>
                  obj.question_id === post.question_id &&
                  obj.indicator_id === post.indicator_id &&
                  obj.taxonomy_id === post.taxonomy_id &&
                  obj.ultimate_fields_id === post.ultimate_fields_id &&
                  obj.development_types_id === post.development_types_id
              ) === -1
              // data.findIndex((obj) => obj.question_id === post.question_id) ===
              //   -1
            ) {
              questionTableData.push(post);
              post = {};
              uf = "";
              taxo = "";
              indi = "";
            }
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   message: "Could not upload the file: " + req.file.originalname,
    // });
  }
};

const getNdhsMaster = (file) => {
  try {
    let reqpath = path.join(__basedir, "..", "/resources/", file.filename);
    const workbook = xlsx.readFile(reqpath);
    // let data = await Ndhs.findAll();
    let post = {};
    let questionMasterData = questionMasterTableData;
    let quesData = questionTableData;
    let qm = "";
    let temp = "";
    let reqCountryName = file.originalname.replace(
      "GRM 2nd phase indicators Questions -",
      ""
    );
    let countryName = reqCountryName.replace(".xlsx", "").trim();
    let countryData = tableData.filter((obj) => obj.name === countryName);
    workbook.SheetNames.forEach((element) => {
      let worksheet = workbook.Sheets[element];
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (cellAsString[1] > 1) {
          post.country_id = countryData[0].id;
          if (cellAsString[0] === "C") {
            temp = worksheet[cell].v;
          }
          if (cellAsString[0] === "D") {
            qm = worksheet[cell].v;
            if (qm !== undefined && qm !== 100) {
              let pattern = /[(]+[\d]*[)]+/;
              let result = qm.search(pattern);
              if (result !== -1) {
                qm = qm.substr(0, result - 1);
              }
            }
            if (
              !temp.startsWith("Total") &&
              !temp.startsWith("TOTAL") &&
              questionMasterData.findIndex((obj) => obj.name === qm) !== -1
            ) {
              let tempIndex =
                questionMasterData.findIndex((obj) => obj.name === qm) + 1;
              if (
                quesData.findIndex((obj) => obj.question_id === tempIndex) !==
                -1
              ) {
                post.question_id =
                  quesData.findIndex((obj) => obj.question_id === tempIndex) +
                  1;
              }
            }
          }
          if (cellAsString[0] === "E") {
            if (!temp.startsWith("Total") && !temp.startsWith("TOTAL")) {
              post.score = worksheet[cell].v;
            }
          }
          if (cellAsString[0] === "F") {
            post.status = worksheet[cell].v;
          }
          if (cellAsString[0] === "G") {
            post.texts = worksheet[cell].v;
            if (typeof post.texts !== "number") {
              post.texts = worksheet[cell].v
                .replace(/(\r\n|\r|\n|\|)/g, " ")
                .trim();
            }
          }
          if (cellAsString[0] === "H") {
            post.links = worksheet[cell].v
              .replace(/(\r\n|\r|\n|\|)/g, ",")
              .trim();
            post.year = 2021;
          }
          if (
            post.texts !== undefined &&
            post.links !== undefined &&
            post.status !== undefined &&
            post.question_id !== undefined &&
            post.score !== undefined &&
            ndhsTableData.findIndex(
              (obj) =>
                obj.question_id === post.question_id &&
                obj.country_id === post.country_id
            ) === -1
          ) {
            ndhsTableData.push(post);
            post = {};
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   message: "Could not upload the file: " + req.file.originalname,
    // });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resources/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes =
      /.xlsx|vnd.openxmlformats-officedocument.spreadsheetml.sheet|csv/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).array("file");

const getAllData = async (req, res) => {
  req.files.forEach((file) => {
    req.file = file;
    // getCountriesData(req, res);
    // getGovernanceType(req);
    // getUltimateField(req);
    // getIndicatorsData(req);
    // getTaxanomyData(req);
    getQuestionMaster(req);
    // getQuestionsData(req);
    // getNdhsMaster(file);
  });
};

const loadData = async () => {
  let govenanceApi = await Governances.findAll();
  let ultimateApi = await UltimateField.findAll();
  let indicatorApi = await Indicator.findAll();
  let taxonomyApi = await Taxonomies.findAll();
  let questionMasterApi = await QuestionMaster.findAll();
  let questionApi = await Questions.findAll();
  let ndhsApi = await Ndhs.findAll();
  let CountryApi = await Countries.findAll();

  CountryApi.forEach((element) => {
    tableData.push(element.dataValues);
  });

  govenanceApi.forEach((element) => {
    govenanceTableData.push(element.dataValues);
  });

  ultimateApi.forEach((element) => {
    ultimateTableData.push(element.dataValues);
  });

  indicatorApi.forEach((element) => {
    indicatorTableData.push(element.dataValues);
  });

  taxonomyApi.forEach((element) => {
    taxonomyTableData.push(element.dataValues);
  });

  questionMasterApi.forEach((element) => {
    questionMasterTableData.push(element.dataValues);
  });

  questionApi.forEach((element) => {
    questionTableData.push(element.dataValues);
  });

  ndhsApi.forEach((element) => {
    ndhsTableData.push(element.dataValues);
  });
};

const setAllData = async (req, res) => {
  if (req.files == undefined) {
    return res.status(400).send("Please upload an excel file!");
  }
  try {
    // loadData().then(() => {
    getAllData(req, res).then(async () => {
      // await Countries.bulkCreate(tableData);
      // await getDevelopmentType(req, res);
      // await Governances.bulkCreate(govenanceTableData);
      // await UltimateField.bulkCreate(ultimateTableData);
      // await Indicator.bulkCreate(indicatorTableData);
      // await Taxonomies.bulkCreate(taxonomyTableData);
      // await QuestionMaster.bulkCreate(questionMasterTableData);
      // await Questions.bulkCreate(questionTableData);
      // await Ndhs.bulkCreate(ndhsTableData);
      res.status(200).send({
        message: "files uploaded successfully",
      });
    });
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

  // .then(async () => {
  //   govenanceTableData = [];
  //   ultimateTableData = [];
  //   indicatorTableData = [];
  //   taxonomyTableData = [];
  //   questionMasterTableData = [];
  //   questionTableData = [];
  //   ndhsTableData = [];
  //   tableData = [];
  // });
};

module.exports = {
  upload,
  getCountriesData,
  setAllData,
  // testData,
};


