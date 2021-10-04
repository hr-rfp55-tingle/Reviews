const db = require('./index.js');

const getReviews = async (product_id, page, count, sort) => {
  let text = `SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, to_timestamp(reviews.date/1000) AS date, reviews.reviewer_name, reviews.helpfulness, json_agg(json_build_object('id', reviewsPhotos.id, 'url', reviewsPhotos.url)) AS photos
  FROM reviews LEFT JOIN reviewsPhotos
  ON reviewsPhotos.review_id = reviews.id
  WHERE reviews.product_id = $1 AND reviews.reported = false
  GROUP BY reviews.id
  ORDER BY ${sort} DESC
  LIMIT $2
  OFFSET $3;`
  try {
    const res = await db.query(text, [product_id, count, (page - 1) * count]);
    return res.rows;
  } catch (err) {
    console.log(err.stack);
  }
}

const getReviewsMeta = async (product_id) => {
  let ratings = `SELECT json_build_array(rating, COUNT(rating)) AS ratings
  FROM reviews
  WHERE product_id = $1 AND reported = false
  GROUP BY rating
  ORDER BY rating;`;
  let recommended = `SELECT json_build_array(recommend, COUNT(recommend)) AS recommended
  FROM reviews
  WHERE product_id = $1 AND reported = false
  GROUP BY recommend
  ORDER BY recommend;`;
  let characteristics = `SELECT json_build_array(c.name, json_build_object('id', c.id, 'value', AVG(cr.value))) AS characteristics FROM characteristics c
  INNER JOIN characteristic_review cr
  ON c.id = cr.characteristic_id
  AND c.product_id = $1
  JOIN reviews r
  ON r.id = cr.review_id
  AND r.reported = false
  GROUP BY c.name, c.id
  ORDER BY c.id;`;
  try {
    const resRatings = await db.query(ratings, [product_id]);
    const resRecommended = await db.query(recommended, [product_id]);
    const resCharacteristics = await db.query(characteristics, [product_id]);
    let result = {
      product_id,
      'ratings': {},
      'recommended': {},
      'characteristics': {}
    }
    for (let i = 0; i < resRatings.rows.length; i++) {
      result.ratings[resRatings.rows[i].ratings[0]] = resRatings.rows[i].ratings[1];
    }
    for (let i = 0; i < resRecommended.rows.length; i++) {
      result.recommended[resRecommended.rows[i].recommended[0]] = resRecommended.rows[i].recommended[1];
    }
    for (let i = 0; i < resCharacteristics.rows.length; i++) {
      console.log(resCharacteristics.rows[i]);
      result.characteristics[resCharacteristics.rows[i].characteristics[0]] = resCharacteristics.rows[i].characteristics[1];
    }

    return result;
  } catch (err) {
    console.log(err.stack);
  }
}

const postReview = async ({product_id, rating, summary, body, recommend, name, email, photos, characteristics}) => {
  const text = `INSERT INTO reviews(product_id, rating, summary, body, recommend, reviewer_name, reviewer_email)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`

  try {
    const res = await db.query(text, [product_id, rating, summary, body, recommend, name, email]);
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }

}

const putHelpful = async (review_id) => {
  const text = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';
  try {
    const res = await db.query(text, [review_id]);
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
}

const putReport = async (review_id) => {
  const text = 'UPDATE reviews SET reported = true WHERE id = $1';
  try {
    const res = await db.query(text, [review_id]);
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = {
  getReviews,
  getReviewsMeta,
  postReview,
  putHelpful,
  putReport
}