module.exports = app => {
  const studyings = require("../controllers/studying.controller.js");

  var router = require("express").Router();

  // Create a new studying
  router.post("/", studyings.create);

  // Retrieve all studyings
  router.get("/", studyings.findAll);

  // Retrieve a single studying with id
  router.get("/:id", studyings.findOne);

  // Update a studying with id
  router.put("/:id", studyings.update);

  // Delete a studying with id
  router.delete("/:id", studyings.delete);

  // Delete all studyings
  router.delete("/", studyings.deleteAll);

  app.use("/api/studyings", router);
};
