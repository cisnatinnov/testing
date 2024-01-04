module.exports = app => {
  const persons = require("../controllers/person.controller.js");

  var router = require("express").Router();

  // Create a new person
  router.post("/", persons.create);

  // Retrieve all persons
  router.get("/", persons.findAll);

  // Retrieve a single person with id
  router.get("/:id", persons.findOne);

  // Update a person with id
  router.put("/:id", persons.update);

  // Delete a person with id
  router.delete("/:id", persons.delete);

  // Delete all persons
  router.delete("/", persons.deleteAll);

  app.use("/api/persons", router);
};
