import countBy from 'lodash/countBy';
import orderError from '../error/order-error';
import products from './products';

export default class Order {

	handleOrder (order) {
		let minPacks;

		if (this.validate(order)) {
			return order.reduce((acc, item) => {
				minPacks = this.calculateMinPacks(this.getPackAmounts(products[item.id]), item.amount);
				//put the ID back in the array
				minPacks = [{
					[item.id]: {
						totalPrice: this.handlePrices(minPacks, products[item.id].packs),
						packs: this.formatPacks(minPacks, products[item.id].packs),
					},
				}];
				acc.push(minPacks);
				return acc;
			}, []);
		}
	}

	validate (order) {
		let errors = [];

		order.forEach((item, i) => {
			const orderErrors = {};

			if (!item.id) {
				orderErrors.id = 'Order requires id';
				errors[i] = orderErrors;
			}
			if (item.id && !products[item.id]) {
				orderErrors.id = `Invalid product id ${item.id}`;
				errors[i] = orderErrors;
			}
			if (!item.amount) {
				orderErrors.amount = 'Order amount is required';
				errors[i] = orderErrors;
			}
			if (item.amount && !Number.isInteger(item.amount)) {
				orderErrors.amount = 'Order amount needs to be an integer';
				errors[i] = orderErrors;
			}
		});

		if (errors.length) {
			throw new orderError({ errors }, 400);
		}

		return true;
	}

	formatPacks (packs, dbPacks) {
		const counted = countBy(packs);

		let formatted = [];

		Object.keys(counted).forEach((key) => {
			const cost = this.getPackCost(parseInt(key), dbPacks);
			const totalCost = cost * counted[key];
			const costToDollars =  this.intToDollars(totalCost);

			formatted.push(`${counted[key]} x ${key} = ${costToDollars}`);
		});

		return formatted;
	}

	getPackAmounts (product) {
		return product.packs.map(pack => pack.amount);
	}

	rewind (packs, remainder, finalOrder, popAmount) {
		let popped;
		//pop the last pack from the finalOrder and add the pack amount back to remainder
		for (let i = 0;  i < popAmount; i++) {
			popped = finalOrder.pop();
			remainder = remainder + popped;
		}
		//we cant find the correct packs to add together
		if (packs.length === 0) {
			const err = new Error('Invalid order amount');
			err.status = 400;
			throw err;
		}
		//unshift the first element off the packs array
		packs.shift();

		return remainder;
	}

	calculateMinPacks (packs, orderAmount, remainder = orderAmount, finalOrder = [], popAmount = 1) {
		let finalOrderSum;

		// get the first pack smaller than whats left in remainder of order
		const pack = packs.find((pack) => pack <= remainder);
		// push the pack on the stack
		if (pack !== undefined) {
			finalOrder.push(pack);
			finalOrderSum = this.sumOrder(finalOrder);

			if (finalOrderSum === orderAmount) {
				return finalOrder;
			}
			// get the remaining amount on the order
			else {
				remainder = remainder - pack;
			}
		}
		//handle if we cant match the order
		else {
			// if at the last pack pop an extra pack from the finalOrder
			if (packs.indexOf(finalOrder[finalOrder.length - 1]) === packs.length - 1) {
				popAmount++;
			}
			remainder = this.rewind(packs, remainder, finalOrder, popAmount);
		}

		return this.calculateMinPacks(packs, orderAmount, remainder, finalOrder, popAmount);
	}

	sumOrder (arr) {
		return arr.reduce((acc, amount) => {
			return acc + amount;
		}, 0);
	}

	getPackCost (amount, dbPacks) {
		const packCost = dbPacks.find((dbPack) => dbPack.amount === amount);
		return packCost.cost;
	}

	intToDollars (price) {
		const priceInDollars = price / 100;
		return priceInDollars.toLocaleString('en-AU', { style: 'currency', currency: 'USD' });
	}

	handlePrices (orderPacks, dbPacks) {
		const price = orderPacks.reduce((acc, amount) => {
			const packCost = this.getPackCost(amount, dbPacks);
			return packCost + acc;
		}, 0);
		return this.intToDollars(price);
	}
}
