module.exports = (sequelize, Sequelize) => {
    const GovernanceTypes = sequelize.define(
      "governance_types",
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
  
    return GovernanceTypes;
  };
  