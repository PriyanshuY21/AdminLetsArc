const express = require('express');
const router = express.Router();
const AdminProject = require('../Models/Adminprojects'); 

// GET: Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await AdminProject.find({}); // Fetch all projects from database
    res.json(projects); // Send projects back as JSON
  } catch (error) {
    console.error('Error fetching projects:', error.message); // Log any errors
    res.status(500).send('Internal Server Error'); // Sends 500 status code if there's an error
  }
});

// POST: Creates new project
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, projectName, clientName, contactNumber, email, date } = req.body;

    // Checks if all required fields are present
    if (!firstName || !lastName || !projectName || !clientName || !contactNumber || !email || !date) {
      return res.status(400).send('All fields are required'); // Sends 400 status code if any field is missing
    }

    // Creates new AdminProject instance with provided data
    const adminProject = new AdminProject({ firstName, lastName, projectName, clientName, contactNumber, email, date });
    await adminProject.save(); // Saves project to database

    res.status(200).send('Project assigned'); // Sends success message
  } catch (error) {
    console.error('Error processing request:', error.message); // Log any errors
    res.status(500).send('Internal Server Error'); // Sends 500 status code if there's an error
  }
});

// PUT: Updates project by ID
router.put('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { firstName, lastName, projectName, clientName, contactNumber, email, date, progress } = req.body;

  try {
    // Find project by ID and update it with new data
    const project = await AdminProject.findByIdAndUpdate(
      projectId,
      { $set: { firstName, lastName, projectName, clientName, contactNumber, email, date, progress } },
      { new: true } // Return updated document
    );

    if (!project) {
      return res.status(404).send('Project not found'); // Sends 404 status code if project isn't found
    }

    res.json(project); // Sends updated project back as JSON
  } catch (error) {
    console.error('Error updating project details:', error.message); // Log any errors
    res.status(500).send('Internal Server Error'); // Send a 500 status code if there's an error
  }
});

// PUT: Updates project by name
router.put('/name/:projectName', async (req, res) => {
  const { projectName } = req.params;
  const { firstName, lastName, clientName, contactNumber, email, date, progress } = req.body;

  try {
    // Find project by name and update it with new data
    const project = await AdminProject.findOneAndUpdate(
      { projectName },
      { $set: { firstName, lastName, clientName, contactNumber, email, date, progress } },
      { new: true } // Return updated document
    );

    if (!project) {
      return res.status(404).send('Project not found'); // Send a 404 status code if the project isn't found
    }

    res.json(project); // Sends updated project back as JSON
  } catch (error) {
    console.error('Error updating project details:', error.message); // Log any errors
    res.status(500).send('Internal Server Error'); // Sends 500 status code if there's an error
  }
});

// DELETE: Deletes project by name
router.delete('/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    // Find project by name and delete it
    const project = await AdminProject.findOneAndDelete({ projectName });

    if (!project) {
      return res.status(404).send('Project not found'); // Sends 404 status code if the project isn't found
    }

    res.status(200).send('Project deleted'); // Sends success message
  } catch (error) {
    console.error('Error deleting project:', error.message); // Log any errors
    res.status(500).send('Internal Server Error'); // Send a 500 status code if there's an error
  }
});

module.exports = router;
