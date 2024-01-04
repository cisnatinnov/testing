module.exports = (sequelize, Sequelize) => {
  const Score = sequelize.define("scores", {
    nim: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    middle_test: {
      type: Sequelize.INTEGER
    },
    task: {
      type: Sequelize.INTEGER
    },
    final_test: {
      type: Sequelize.INTEGER
    }
  });

  return Score;
};
