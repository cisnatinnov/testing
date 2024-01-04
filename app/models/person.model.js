module.exports = (sequelize, Sequelize) => {
  const Person = sequelize.define("persons", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM('MALE', 'FEMALE')
    }
  });

  return Person;
};
