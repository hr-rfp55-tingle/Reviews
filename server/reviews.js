const express = require('express');
const dbFunc = require('../db/helpers');

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  const product_id = req.query.product_id;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  let sort = req.query.sort || 'newest';
  if (sort === 'newest') {
    sort = 'date';
  }
  try {
    const results = await dbFunc.getReviews(product_id, page, count, sort );
    res.status(200).send(results);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get('/meta', async (req, res) => {
  try {
    const results = await dbFunc.getReviewsMeta(req.query.product_id);
    res.status(200).send(results);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    await dbFunc.postReview(req.body);
    res.status(204).send(`Posted review: ${JSON.stringify(req.body)}`);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put('/:review_id/helpful', async (req, res) => {
  try {
    await dbFunc.putHelpful(req.params.review_id);
    res.status(204).send(`Marked ${req.params.review_id} as helpful`);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put('/:review_id/report', async (req, res) => {
  try {
    await dbFunc.putReport(req.params.review_id);
    res.status(204).send(`Marked ${req.params.review_id} as reported`);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;