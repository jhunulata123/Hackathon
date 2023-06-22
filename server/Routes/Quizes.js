const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Quiz = require("../Models/QuizSchema");
const User = require("../Models/UserSchema");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the quizes using: GET "./api/quizes/fetchallquizes. " Login required.
router.get("/fetchallquizes", fetchuser, async (req, res) => {
  try {
    const quizes = await Quiz.find({ user: req.user._id });
    res.json(quizes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new quiz using: POST  "./api/quizes/addQuiz. " Login required.
router.post(
    "/addQuiz",
    fetchuser,
    [
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("description", "Description must be at least 5 characters long").isLength({ min: 5 }),
      body("questions", "Please provide at least one question").isArray({ min: 1 }),
      body("questions.*.questionText", "Question text is required").notEmpty(),
      body("questions.*.options", "Please provide at least one option for each question").isArray({ min: 1 }),
      body("questions.*.options.*.optionText", "Option text is required").notEmpty(),
      body("questions.*.options.*.isCorrect", "isCorrect flag is required and must be a boolean").isBoolean(),
    ],
    async (req, res) => {
      try {
        const { title, description, questions } = req.body;
        //if there are errors, return status 400
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // Create a new Quiz object
        const quiz = new Quiz({
          title,
          description,
          questions,
          user: req.user._id,
        });
  
        const savedQuiz = await quiz.save();
  
        res.json(savedQuiz);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  

// ROUTE 3: Update an existing Note using: PUT "/api/projects/updateproject". Login required
router.put('/updatequiz/:id', fetchuser, async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    // Find the quiz to be updated
    let quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }

/*// Check if the user is the owner of the quiz
    if (quiz.user.toString() !== req.user._id) {
      return res.status(401).send("Not allowed");
    } */

    // Update the quiz fields
    if (title) {
      quiz.title = title;
    }
    if (description) {
      quiz.description = description;
    }
    if (questions) {
      quiz.questions = questions;
    }

    // Save the updated quiz
    const updatedQuiz = await quiz.save();

    res.json(updatedQuiz);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 4 : Delete an existing Note using : DELETE  "/api/notes/deleteProject" : LOGIN REQUIRED
router.delete('/deleteQuiz/:id', fetchuser, async (req, res) => {
  try {
    // Find the quiz to be deleted
    let quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }

    // Check if the user is an admin
    // if (!req.user.isAdmin) {
    //   console.log(req.user)
    //   return res.status(401).send("Not authorized");
    // }

    // Delete the quiz
    quiz = await Quiz.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Quiz has been deleted", quiz: quiz });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
