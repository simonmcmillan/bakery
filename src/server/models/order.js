import products from './products';

export default class Order {
	handleOrder (order) {
		return order.reduce((acc, item) => {
			if (!item.id && item.amount) {
				throw new Error('order requires id and amount');
			}

			const minPacks = this.calculateMinPacks(this.getPackAmounts(products[item.id]), item.amount);
			console.log('exit', minPacks);

			acc.push(minPacks);
		}, []);
	}

	getPackAmounts (product) {
		return product.packs.map(pack => pack.amount);
	}
	//**Get the minimun that add to order amount**
	//1. Sort pack size from largest to smallest
	//2. recursive loop, check exit condition: orderAmount matches sum pack sizes, break.
	//3. push largest pack size less than order to final array
	//4. take difference between pack size and order
	//5. add largest pack size less than remainder to the pushed packs, if greater than total pop pushed pack (store the used pack size value)
	//6. push second largest pack size to final order
	//7. repeat
	calculateMinPacks (packs, orderAmount, remainder = orderAmount, finalOrder = []) {
		let finalOrderSum;

		// get the first pack smaller than whats left in remainder of order
		const pack = packs.find((pack) => pack <= remainder);
		// push the pack on the stack
		if (pack) {
			finalOrder.push(pack);
			finalOrderSum = this.sumOrder(finalOrder);
		}
console.log(finalOrder);
		//handle if we cant match the order
		if (!pack || finalOrder.length > 5) {
			//pop the last pack from the finalOrder and add the pack amount back to remainder
			const popped = finalOrder.pop();
			remainder = remainder + popped;
			//unshift the first element off the packs array
			packs.shift();
		}
		//exit the loop if we have matched the order
		else if (finalOrderSum === orderAmount || finalOrder.length > 5) {
			return finalOrder;
		}
		// get the remaining amount on the order
		else {
			remainder = remainder - pack;
		}

		return this.calculateMinPacks(packs, orderAmount, remainder, finalOrder);
	}

	sumOrder (arr) {
		return arr.reduce((acc, amount) => {
			return acc + amount;
		}, 0);
	}

	calculateCost (quantity, price) {
		return quantity * price;
	}
}
