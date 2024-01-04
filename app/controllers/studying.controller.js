const db = require("../models");
const Studying = db.studyings;
const Op = db.Sequelize.Op;

// Create and Save a new studying
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nim) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a studying
  const studying = {
    code: req.body.code,
    name: req.body.name,
    sks: req.body.sks
  };

  // Save Studying in the database
  Studying.create(studying)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Studying."
      });
    });
};

// Retrieve all Studyings from the database.
exports.findAll = (req, res) => {
  const nim = req.query.nim;
  var condition = nim ? { nim: { [Op.iLike]: `%${nim}%` } } : null;

  Studying.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Studyings."
      });
    });
};

// Find a single Studying with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Studying.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Studying with id=${id}.`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving Studying with id=" + id
      });
    });
};

// Update a Studying by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Studying.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Person was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Studying with id=${id}. Maybe Studying was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating Studying with id=" + id
      });
    });
};

// Delete a Studying with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Studying.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Person was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Studying with id=${id}. Maybe Studying was not found!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not delete Studying with id=" + id
      });
    });
};

// Delete all Studyings from the database.
exports.deleteAll = (_req, res) => {
  Studying.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Studyings were deleted successfully!` });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Studyings."
      });
    });
};
