const db = require("../models");
const Person = db.persons;
const Op = db.Sequelize.Op;

// Create and Save a new Person
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Person
  const person = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    gender: req.body.gender
  };

  // Save Person in the database
  Person.create(person)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    });
};

// Retrieve all Persons from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Person.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Persons."
      });
    });
};

// Find a single Person with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Person.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Person with id=${id}.`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving Person with id=" + id
      });
    });
};

// Update a Person by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Person.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Person was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating Person with id=" + id
      });
    });
};

// Delete a Person with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Person.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Person was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not delete Person with id=" + id
      });
    });
};

// Delete all Persons from the database.
exports.deleteAll = (_req, res) => {
  Person.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Persons were deleted successfully!` });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Persons."
      });
    });
};
