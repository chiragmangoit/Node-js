module.exports = (sequelize, Sequelize) => {
  const NdhsMaster = sequelize.define(
    "ndhs_master",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      score: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      texts: {
        type: Sequelize.TEXT,
      },
      links: {
        type: Sequelize.TEXT,
      },
      year: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );

  return NdhsMaster;
};
