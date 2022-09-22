module.exports = (sequelize, Sequelize) => {
    const UltimateField = sequelize.define(
      "ultimate_fields",
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
  
    return UltimateField;
  };
  