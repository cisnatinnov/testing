module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    nim: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    major: {
      type: Sequelize.STRING
    }
  });

  return Student;
};
