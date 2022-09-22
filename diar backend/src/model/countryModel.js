module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define(
    "countries",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      iso_code: {
        type: Sequelize.STRING,
      },
      flag_path: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.FLOAT,
      },
      lng: {
        type: Sequelize.FLOAT,
      },
    },
    { timestamps: false }
  );

  return Country;
};
