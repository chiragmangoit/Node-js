const db = require("../model");

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


const getCountries = async(req,res) => {
    try {
        let country = await Countries.findAll({
            include: [
                {
                  model: QuestionMaster,
                  through: {
                    attributes: ['year']
                  }
                },
              ],
        })
        res.status(200).send(country)
    } catch (error) {
        res.status.send(error)
    }
}

