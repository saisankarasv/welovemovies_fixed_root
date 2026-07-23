const db = require('../db/connection');

async function list(is_showing) {
  const query = db('movies').select('movies.*').orderBy('movies.movie_id');

  if (String(is_showing) === 'true') {
    return query
      .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
      .where({ 'movies_theaters.is_showing': true })
      .groupBy('movies.movie_id');
  }

  return query;
}

async function read(movie_id) {
  return db('movies').where({ movie_id }).first();
}

async function theatersForMovie(movie_id) {
  return db('theaters')
    .join('movies_theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
    .where({ 'movies_theaters.movie_id': movie_id })
    .select('theaters.*', 'movies_theaters.movie_id', 'movies_theaters.is_showing')
    .orderBy('theaters.theater_id');
}

async function reviewsForMovie(movie_id) {
  return db('reviews')
    .join('critics', 'critics.critic_id', 'reviews.critic_id')
    .where({ 'reviews.movie_id': movie_id })
    .select(
      'reviews.*',
      'critics.critic_id as critic_critic_id',
      'critics.preferred_name as critic_preferred_name',
      'critics.surname as critic_surname',
      'critics.organization_name as critic_organization_name',
      'critics.created_at as critic_created_at',
      'critics.updated_at as critic_updated_at'
    )
    .orderBy('reviews.review_id');
}

module.exports = {
  list,
  read,
  theatersForMovie,
  reviewsForMovie,
};
