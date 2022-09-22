module.exports = (sequelize, Sequelize) => {
    const DevelopmentTypes = sequelize.define(
      "development_types",
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
  
    return DevelopmentTypes;
  };
  