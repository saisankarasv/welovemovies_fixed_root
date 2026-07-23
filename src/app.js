if (process.env.USER) require('dotenv').config();

const cors = require('cors');
const express = require('express');
const moviesRouter = require('./movies/movies.router');
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require('./reviews/reviews.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);
app.use('/reviews', reviewsRouter);

app.use((req, res, next) => {
  next({ status: 404, message: 'Not Found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).json({ error: message });
});

module.exports = app;
