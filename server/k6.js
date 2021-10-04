import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '60s',
};

export default function () {
  const product = Math.floor(Math.random() * 10000 + 90000);
  const params = { headers: { 'Content-Type': 'application/json' } };
  // http.request('GET', `http://localhost:3002/reviews?product_id=${product}`, params);
  http.request('GET', `http://localhost:3002/reviews/meta?product_id=${product}`, params);
  sleep(1);
}