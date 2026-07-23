const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function movieExists(request, response, next) {
  const movie = await service.read(request.params.movieId);

  if (movie) {
    response.locals.movie = movie;
    return next();
  }

  next({ status: 404, message: 'Movie cannot be found.' });
}

async function read(request, response) {
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  const movies = await service.list(request.query.is_showing);
  response.json({ data: movies });
}

async function theaters(request, response) {
  const theaters = await service.theatersForMovie(request.params.movieId);
  response.json({ data: theaters });
}

async function reviews(request, response) {
  const reviews = await service.reviewsForMovie(request.params.movieId);

  const data = reviews.map((review) => ({
    review_id: review.review_id,
    content: review.content,
    score: review.score,
    created_at: review.created_at,
    updated_at: review.updated_at,
    critic_id: review.critic_id,
    movie_id: review.movie_id,
    critic: {
      critic_id: review.critic_critic_id,
      preferred_name: review.critic_preferred_name,
      surname: review.critic_surname,
      organization_name: review.critic_organization_name,
      created_at: review.critic_created_at,
      updated_at: review.critic_updated_at,
    },
  }));

  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  theaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theaters)],
  reviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviews)],
};
