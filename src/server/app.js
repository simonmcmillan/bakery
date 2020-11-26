import express from 'express';
import bodyParser from 'body-parser';
import Order from './models/order';

const app = express();


app.post('/bakery',
	bodyParser.json(),
	(req, res, next) => {
		if (req.body.length > 0) {
			const order = new Order();
			let orders;

			try {
				orders = order.handleOrder(req.body);
			}
			catch (err) {
				next(err);
			}

			res.json(orders);
		}
		else {
			const err = new Error('Please provide an order!');
			err.status = 400;
			next(err);
		}
	}
);

//Generic error handler
/*eslint-disable*/
app.use((err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
		err.errors = 'Something went wrong!';
	}

	res.status(err.status).send(err.errors);
});

export default app;
