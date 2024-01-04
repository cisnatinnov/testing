module.exports = (sequelize, Sequelize) => {
  const Studying = sequelize.define("studyings", {
    code: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    sks: {
      type: Sequelize.INTEGER
    }
  });

  return Studying;
};
