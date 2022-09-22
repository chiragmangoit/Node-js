module.exports = (sequelize, Sequelize) => {
  const Questions = sequelize.define(
    "questions",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question_score: {
        type: Sequelize.INTEGER,
      },
      indicator_score: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );

  return Questions;
};
