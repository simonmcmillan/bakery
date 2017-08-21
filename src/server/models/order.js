import products from './products';

export default class Order {

	handleOrder (order) {
		let minPacks;
		try {
			return order.reduce((acc, item) => {
				if (!item.id && item.amount) {
					throw new Error('order requires id and amount');
				}
				minPacks = this.calculateMinPacks(this.getPackAmounts(products[item.id]), item.amount);
				//put the ID back in the array
				minPacks = [{
					[item.id]: {
						totalPrice: this.handlePrices(minPacks, products[item.id].packs),
						packs: minPacks,
					},
				}];
				acc.push(minPacks);
				return acc;
			}, []);
		}
		catch (err) {
			console.error(err);
		}
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
			throw new Error('Invalid order amount');
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

	handlePrices (orderPacks, dbPacks) {
		const price = orderPacks.reduce((acc, amount) => {
			const packCost = dbPacks.find((dbPack) => dbPack.amount === amount);
			return packCost.cost + acc;
		}, 0);

		const priceInDollars = price / 100;
		return priceInDollars.toLocaleString('en-AU', { style: 'currency', currency: 'USD' });
	}
}
