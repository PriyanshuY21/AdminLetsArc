const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
