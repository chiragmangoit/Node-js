module.exports = (sequelize, Sequelize) => {
  const Taxonomies = sequelize.define(
    "taxonomies",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      taxonomy_score: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );

  return Taxonomies;
};
