const db = require('../db/connection');

const tableName = 'reviews';

async function destroy(reviewId) {
  return db(tableName).where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  return db(tableName)
    .join('critics', 'critics.critic_id', 'reviews.critic_id')
    .where({ movie_id })
    .select(
      'reviews.review_id',
      'reviews.content',
      'reviews.score',
      'reviews.created_at',
      'reviews.updated_at',
      'reviews.critic_id',
      'reviews.movie_id',
      'critics.critic_id as critic_critic_id',
      'critics.preferred_name as critic_preferred_name',
      'critics.surname as critic_surname',
      'critics.organization_name as critic_organization_name',
      'critics.created_at as critic_created_at',
      'critics.updated_at as critic_updated_at'
    )
    .orderBy('reviews.review_id');
}

async function read(reviewId) {
  return db(tableName).where({ review_id: reviewId }).first();
}

async function readCritic(critic_id) {
  return db('critics').where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review)
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
