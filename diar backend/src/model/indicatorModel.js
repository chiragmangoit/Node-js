module.exports = (sequelize, Sequelize) => {
  const Indicators = sequelize.define(
    "indicators",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );

  return Indicators;
};
