const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://LetsArcMedia:ck2BRsv5h0FvCwcm@letsarcmediadb.nhwlq0u.mongodb.net/?retryWrites=true&w=majority&appName=LetsArcMediaDB')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const adminProjectsRoutes = require('./Routes/adminprojects');

app.use('/api/adminprojects', adminProjectsRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
