const db = require('./index.js');

const getReviews = async (product_id, page, count, sort) => {
  let text = `SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, to_timestamp(reviews.date/1000) AS date, reviews.reviewer_name, reviews.helpfulness, json_agg(json_build_object('id', reviewsPhotos.id, 'url', reviewsPhotos.url)) AS photos
  FROM reviews LEFT JOIN reviewsPhotos
  ON reviewsPhotos.review_id = reviews.id
  WHERE reviews.product_id = $1 AND reviews.reported = false
  GROUP BY reviews.id
  ORDER BY $2 desc
  LIMIT $3
  OFFSET $4;`
  try {
    const res = await db.query(text, [product_id, sort, count, (page - 1) * count]);
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }

}

const getReviewsMeta = async () => {

}

const postReview = async () => {

}

const putHelpful = async (review_id) => {
  const text = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';
  try {
    const res = await db.query(text, [review_id])
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
}

const putReport = async (review_id) => {
  const text = 'UPDATE reviews SET reported = true WHERE id = $1';
  try {
    const res = await db.query(text, [review_id])
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
}

module.exports = {
  getReviews,
  getReviewsMeta,
  postReview,
  putHelpful,
  putReport
}