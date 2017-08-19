import express from 'express';
import bodyParser from 'body-parser';
import Order from './models/order';

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/bakery',
	bodyParser.json(),
	(req, res) => {
		if (req.body.length > 0) {
			const order = new Order();
			res.json(order.handleOrder(req.body));
		}
		else {
			res.status(400).send('Please provide a valid order!');
		}
	}
);

export default app;
