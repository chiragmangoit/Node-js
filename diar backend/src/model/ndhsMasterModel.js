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
        type: Sequelize.BOOLEAN,
      },
      texts: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      links: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
    },
    { timestamps: false }
  );

  return NdhsMaster;
};
