const db = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');

const reduceMovies = reduceProperties('theater_id', {
  movie_id: ['movies', null, 'movie_id'],
  title: ['movies', null, 'title'],
  runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
  rating: ['movies', null, 'rating'],
  description: ['movies', null, 'description'],
  image_url: ['movies', null, 'image_url'],
  movie_created_at: ['movies', null, 'created_at'],
  movie_updated_at: ['movies', null, 'updated_at'],
  is_showing: ['movies', null, 'is_showing'],
});

async function list() {
  return db('theaters')
    .join(
      'movies_theaters',
      'movies_theaters.theater_id',
      'theaters.theater_id'
    )
    .join('movies', 'movies.movie_id', 'movies_theaters.movie_id')
    .select(
      'theaters.theater_id',
      'theaters.name',
      'theaters.address_line_1',
      'theaters.address_line_2',
      'theaters.city',
      'theaters.state',
      'theaters.zip',
      'theaters.created_at',
      'theaters.updated_at',
      'movies.movie_id',
      'movies.title',
      'movies.runtime_in_minutes',
      'movies.rating',
      'movies.description',
      'movies.image_url',
      'movies.created_at as movie_created_at',
      'movies.updated_at as movie_updated_at',
      'movies_theaters.is_showing'
    )
    .orderBy('theaters.theater_id')
    .then(reduceMovies);
}

module.exports = {
  list,
};
