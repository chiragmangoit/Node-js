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
  try {
    let peoples = await People.findAll({
      attribute: ["id", "name", "age"],
    });
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
    resp.status(500).send({error:error.errors[0].message});
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
