const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const methodNotAllowed = require('../errors/methodNotAllowed');

async function reviewExists(request, response, next) {
  const review = await service.read(request.params.reviewId);

  if (review) {
    response.locals.review = review;
    return next();
  }

  next({ status: 404, message: 'Review cannot be found.' });
}

async function destroy(request, response) {
  await service.destroy(response.locals.review.review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  const reviews = await service.list(request.params.movieId);

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

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };

  const data = await service.update(updatedReview);
  response.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
