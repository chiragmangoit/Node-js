const dbconfig = require("../config/dbconfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("error" + error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.countries = require("./countryModel.js")(sequelize, DataTypes);
db.developments = require("./developmentTypesModel.js")(sequelize, DataTypes);
db.governances = require("./governance_types.js")(sequelize, DataTypes);
db.ultimateFields = require("./ultimateFieldModel.js")(sequelize, DataTypes);
db.taxonomies = require("./taxonomiesModel.js")(sequelize, DataTypes);
db.indicators = require("./indicatorModel.js")(sequelize, DataTypes);
db.questionMaster = require("./questionsMasterModel.js")(sequelize, DataTypes);
db.questions = require("./questionModel.js")(sequelize, DataTypes);
db.ndhs = require("./ndhsMasterModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => console.log("sync is done"));

//1 to many
db.governances.hasMany(db.taxonomies, {
  foreignKey: "governance_id",
  as: "t_id",
});

db.taxonomies.belongsTo(db.governances, {
  foreignKey: "governance_id",
  as: "g_id",
});

db.developments.hasMany(db.ultimateFields, {
  foreignKey: "development_types_id",
  as: "d_id",
});

db.ultimateFields.belongsTo(db.developments, {
  foreignKey: "development_types_id",
  as: "u_id",
});

db.questions.hasMany(db.ndhs, {
  foreignKey: "question_id",
  as: "n_id",
});

db.ndhs.belongsTo(db.questions, {
  foreignKey: "question_id",
  as: "q_id",
});

db.indicators.hasMany(db.questions, {
  foreignKey: "indicator_id",
  as: "i_id",
});

db.questions.belongsTo(db.indicators, {
  foreignKey: "indicator_id",
  as: "qu_id",
});

db.taxonomies.hasMany(db.questions, {
  foreignKey: "taxonomy_id",
  as: "t_id",
});

db.questions.belongsTo(db.taxonomies, {
  foreignKey: "taxonomy_id",
  as: "qut_id",
});

db.ultimateFields.hasMany(db.questions, {
  foreignKey: "ultimate_fields_id",
  as: "uq_id",
});

db.questions.belongsTo(db.ultimateFields, {
  foreignKey: "ultimate_fields_id",
  as: "quf_id",
});

db.developments.hasMany(db.questions, {
  foreignKey: "development_types_id",
  as: "ud_id",
});

db.questions.belongsTo(db.developments, {
  foreignKey: "development_types_id",
  as: "qd_id",
});

db.questionMaster.hasMany(db.questions, {
  foreignKey: "question_id",
  as: "qm_id",
});

db.questions.belongsTo(db.questionMaster, {
  foreignKey: "question_id",
  as: "qdm_id",
});

db.questionMaster.hasMany(db.ndhs, {
  foreignKey: "question_id",
  as: "nd_id",
});

db.ndhs.belongsTo(db.questionMaster, {
  foreignKey: "question_id",
  as: "qnd_id",
});

db.countries.hasMany(db.ndhs, {
  foreignKey: "country_id",
  as: "ct_id",
});

db.ndhs.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "ctd_id",
});

module.exports = db;
