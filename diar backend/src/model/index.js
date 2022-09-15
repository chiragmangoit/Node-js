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

db.indicators = require("./indicatorModel.js")(sequelize, DataTypes);
db.taxonomies = require("./taxonomiesModel.js")(sequelize, DataTypes);
db.governances = require("./governance_types.js")(sequelize, DataTypes);

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

module.exports = db;
