import express from 'express';
import bodyParser from 'body-parser';
import Order from './models/order';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/bakery',
	bodyParser.json(),
	(req, res) => {
		if (req.body.length > 0) {
			const order = new Order();

			const orders = order.handleOrder(req.body);

			res.json(orders);
		}
		else {
			res.status(400).send('Please provide a valid order!');
		}
	}
);

export default app;
