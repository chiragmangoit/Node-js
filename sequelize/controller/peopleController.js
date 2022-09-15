const db = require("../model");

//create main model
const People = db.peoples;

//add an People
const addPeople = async (req, resp) => {
  let person = req.body;
  try {
    const id = req.params.id;
    let peoples = await People.create(person);
    resp.status(200).send(peoples);
  } catch (error) {
    resp.status(500).send(error);
    console.log(error);
  }
};

//get all Peoples
const getAllPeoples = async (req, resp) => {
  let match = {};
  let peoples;
  try {
    if (req.query.age) {
      match = { age: req.query.age.split(",") };
      peoples = await People.findAll({
        attribute: ["id", "name", "age"],
        where: { age: match.age },
      });
    } else {
      peoples = await People.findAll({
        attribute: ["id", "name", "age"],
      });
    }
    resp.status(200).send(peoples);
  } catch (error) {
    resp.status(500).send(error);
    console.log(error);
  }
};

//get single Peoples
const getPeople = async (req, resp) => {
  try {
    const id = req.params.id;
    let peoples = await People.findOne({ where: { id: id } });
    resp.status(200).send(peoples);
  } catch (error) {
    resp.status(500).send(error);
    console.log(error);
  }
};

//delete an People
const deletePeople = async (req, resp) => {
  try {
    const id = req.params.id;
    let peoples = await People.destroy({ where: { id: id } });
    resp.status(200).send("data deleted");
  } catch (error) {
    resp.status(500).send(error);
    console.log(error);
  }
};

//update an People
const updatePeople = async (req, resp) => {
  try {
    const id = req.params.id;
    let peoples = await People.update(req.body, { where: { id: id } });
    resp.status(200).send(peoples);
  } catch (error) {
    resp.status(500).send({ error: error.errors[0].message });
    console.log(error);
  }
};

module.exports = {
  getAllPeoples: getAllPeoples,
  getPeople: getPeople,
  deletePeople: deletePeople,
  addPeople: addPeople,
  updatePeople: updatePeople,
};

// const pagination = async (req, result) => {
//   const numOfResults = result.length;
//   const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
//   let page = req.query.page ? Number(req.query.page) : 1;
//   if (page > numberOfPages) {
//     res.redirect("/?page=" + encodeURIComponent(numberOfPages));
//   } else if (page < 1) {
//     res.redirect("/?page=" + encodeURIComponent("1"));
//   }
//   //Determine the SQL LIMIT starting number
//   const startingLimit = (page - 1) * resultsPerPage;
//   //Get the relevant number of POSTS for this starting page
//   sql = `SELECT * FROM proples LIMIT ${startingLimit},${resultsPerPage}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     let iterator = page - 5 < 1 ? 1 : page - 5;
//     let endingLink =
//       iterator + 9 <= numberOfPages
//         ? iterator + 9
//         : page + (numberOfPages - page);
//     if (endingLink < page + 4) {
//       iterator -= page + 4 - numberOfPages;
//     }
//     res.render("index", {
//       data: result,
//       page,
//       iterator,
//       endingLink,
//       numberOfPages,
//     });
//   });
// };
