const mongoose = require('mongoose');

const adminProjectSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  projectName: { type: String, required: true },
  clientName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  progress: {
    completed: { type: Number, default: 0 },
    total: { type: Number, default: 12 }
  }
});

const AdminProject = mongoose.model('AdminProject', adminProjectSchema);

module.exports = AdminProject;
