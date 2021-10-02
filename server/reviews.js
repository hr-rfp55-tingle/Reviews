const express = require('express');
const dbFunc = require('../db/helpers');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  res.status(200).send(`This is a request for ${req.query.page} pages. ${req.query.count} results per page, sorted by ${req.query.sort}, for product_id ${req.query.product_id}`);
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