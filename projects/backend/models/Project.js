const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progress: {
    completed: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  startDate: { type: String, required: true },
  src: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
