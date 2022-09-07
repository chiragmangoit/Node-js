module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define("people", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "name must only contains alphabets",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "age must be a number",
        },
      },
    },
  });
  return People;
};
