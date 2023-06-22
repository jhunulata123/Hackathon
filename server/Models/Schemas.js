const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});


// Define the Quiz schema
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

// Define the Case Study schema
const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  }
});

// Create the respective models
const Project = mongoose.model('Project', projectSchema);
const Quiz = mongoose.model('Quiz', quizSchema);
const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

module.exports = {Project, Quiz, CaseStudy};
