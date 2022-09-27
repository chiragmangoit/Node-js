module.exports = (sequelize, Sequelize) => {
  const QuestionMaster = sequelize.define(
    "question_master",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
      },
    },
    { timestamps: false }
  );

  return QuestionMaster;
};
