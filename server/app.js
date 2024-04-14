require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const errorHandler = require('./middleware/error/errorHandler');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL

// middleware
app.use(express.json());  //parse json bodies
app.use(cookieParser()); // parses cookies
app.use(express.urlencoded({extended: false}));   //parse forms
app.use(cors()); //Cors handler


// routes
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);


// Error handler middleware
app.use(errorHandler);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Connection failed!', err);
  });