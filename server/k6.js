import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s',
};

export default function () {
  const product = Math.floor(Math.random() * 100000 + 900000);
  // const review = Math.floor(Math.random() * 100000 + 4700000);
  const params = { headers: { 'Content-Type': 'application/json' } };
//   const body = JSON.stringify({
//     "product_id":1,
//     "rating":1,
//     "summary":"summary text",
//     "body": "body text",
//     "recommend": true,
//     "name": "cora",
//     "email": "cora@email",
//     "photos": [],
//     "characteristics": { "14": 5, "15": 5}
//   });
  http.request('GET', `http://localhost:3002/reviews?product_id=${product}`, params);
  // http.request('GET', `http://localhost:3002/reviews/meta?product_id=${product}`, params);
  // http.request('PUT', `http://localhost:3002/reviews/${review}/helpful`, params);
  // http.request('PUT', `http://localhost:3002/reviews/${review}/report`, params);
  // http.request('POST', `http://localhost:3002/reviews`, body, params);

  sleep(1);
}