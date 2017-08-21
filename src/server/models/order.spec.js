import { assert, expect } from 'chai';
import Order from './order';
import products from './products';

describe('bakery/order spec', () => {
	describe('calculate packs', () => {
		let order;

		const validPayload = [
			{
				'id': 'VS5',
				'amount': 10,
			},
			{
				'id': 'MB11',
				'amount': 14,
			},
			{
				'id': 'CF',
				'amount': 13,
			},
		];

		const inValidPayload = [
			{
				'id': 'VS5',
				'amount': 4,
			},
			{
				'id': 'MB11',
				'amount': 0,
			},
			{
				'id': 'CF',
				'amount': 2,
			},
		];

		const availablePacks = [
			[5, 3],
			[8, 5, 2],
			[9, 5, 3],
		];

		const validPacksResult = [
			[5, 5],
			[8, 2, 2, 2],
			[5, 5, 3],
		];

		beforeEach(() => {
			order = new Order();
		});

		/*eslint-disable*/
		for (let i = 0; i < 3; i++) {
			it('returns correct array', () => {
				const minPacks = order.calculateMinPacks(availablePacks[i], validPayload[i].amount);
				expect(minPacks).to.deep.equal(validPacksResult[i]);
			});
		}

		for (let i = 0; i < 3; i++) {
			it('Throw exception on invalid arrays', () => {
				// const minPacks = order.calculateMinPacks(availablePacks[i], inValidPayload[i].amount);
				// console.log(minPacks);
				// console.log(validPacksResult[0]);

				assert.throws(function() {
					order.calculateMinPacks(availablePacks[i], inValidPayload[i].amount)
				},
				Error,
				'Invalid order amount');
			});
		}
	});
});
