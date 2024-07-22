const express = require('express');
const router = express.Router();
const AdminProject = require('../Models/Adminprojects');

router.get('/', async (req, res) => {
  try {
    const projects = await AdminProject.find({});
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, projectName, clientName, contactNumber, email, date } = req.body;

    if (!firstName || !lastName || !projectName || !clientName || !contactNumber || !email || !date) {
      return res.status(400).send('All fields are required');
    }

    const adminProject = new AdminProject({ firstName, lastName, projectName, clientName, contactNumber, email, date });
    await adminProject.save();

    res.status(200).send('Project assigned');
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { firstName, lastName, projectName, clientName, contactNumber, email, date, progress } = req.body;

  try {
    const project = await AdminProject.findByIdAndUpdate(
      projectId,
      { $set: { firstName, lastName, projectName, clientName, contactNumber, email, date, progress } },
      { new: true }
    );

    if (!project) {
      return res.status(404).send('Project not found');
    }

    res.json(project);
  } catch (error) {
    console.error('Error updating project details:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/name/:projectName', async (req, res) => {
  const { projectName } = req.params;
  const { firstName, lastName, clientName, contactNumber, email, date, progress } = req.body;

  try {
    const project = await AdminProject.findOneAndUpdate(
      { projectName },
      { $set: { firstName, lastName, clientName, contactNumber, email, date, progress } },
      { new: true }
    );

    if (!project) {
      return res.status(404).send('Project not found');
    }

    res.json(project);
  } catch (error) {
    console.error('Error updating project details:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const project = await AdminProject.findOneAndDelete({ projectName });

    if (!project) {
      return res.status(404).send('Project not found');
    }

    res.status(200).send('Project deleted');
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
