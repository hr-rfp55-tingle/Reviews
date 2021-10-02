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
  const results = await dbFunc.getReviews(product_id, page, count, sort );
  res.status(200).send(results);
});

router.get('/meta', (req, res) => {
  res.status(200).send(`This is a request for review metadata for product ${req.query.product_id}`);
});

router.post('/', (req, res) => {
  res.status(204).send(`Posted review: ${JSON.stringify(req.body)}`);
});

router.put('/:review_id/helpful', async (req, res) => {
  await dbFunc.putHelpful(req.params.review_id);
  res.status(204).send(`Marked ${req.params.review_id} as helpful`);
});

router.put('/:review_id/report', async (req, res) => {
  await dbFunc.putReport(req.params.review_id);
  res.status(204).send(`Marked ${req.params.review_id} as reported`);
});

module.exports = router;