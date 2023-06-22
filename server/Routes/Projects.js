const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Project = require ("../Models/ProjectSchema");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using: GET "./api/projects/fetchallProjects. " Login required.
router.get("/fetchallProjects", fetchuser, async (req, res) => {
  try {
    const Projects = await Project.find({ user: req.user._id });
    res.json(Projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST  "./api/projects/addProject. " Login required.
router.post(
  "/addProject",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters long").isLength({ min: 5 }),
    body("startDate", "Enter a startDate "),
    body("endDate", "Enter a endDate "),
    body("status", "Enter a status "),
    body("module", "Please Specify the Module "),
  ],
  async (req, res) => {
    try {
      const { title, description, startDate, endDate,status, module } = req.body;
      //if there are errors show status 400
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).jsom({ error: errors.array() });
      }

      //Destructuring taking data from project schema
      const project = new Project({
        title,
        description, 
        startDate,
        endDate,
        status,
        module,
        user: req.user._id,
      });
      const savedProject = await project.save();

      res.json(savedProject);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/projects/updateproject". Login required
router.put('/updateproject/:id', fetchuser, async (req, res) => {
  const { title, description ,status } = req.body;
  try {
      // Create a newProject object
      const newProject = {};
      if (title) { newProject.title = title };
      if (description) { newProject.description = description };
      if (status) { newProject.status = status }; 
      if (endDate) { newProject.endDate = endDate }; 
      if (module) { newProject.module = module }; 

      // Find the Project to be updated and update it
      let project = await Project.findById(req.params.id);
      if (!project) { return res.status(404).send("Not Found") }

      // if (project.user.toString() !== req.user._id) {
      //     return res.status(401).send("Not Allowed");
      // }
       project = await Project.findByIdAndUpdate(req.params.id, { $set: newProject }, { new: true })
      res.json({ project });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// ROUTE 4 : Delete an existing Note using : DELETE  "/api/notes/deleteProject" : LOGIN REQUIRED
router.delete('/deleteProject/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let project = await Project.findById(req.params.id);
      if (!project) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      // if (project.user.toString() !== req.user.id) {
      //     return res.status(401).send("Not Allowed");
      // }

      project = await Project.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Project has been deleted", project: project });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

module.exports = router;