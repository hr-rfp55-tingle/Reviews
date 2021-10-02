const db = require('./index.js');

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
  putHelpful,
  putReport
}