/**
 * Created by pooya on 2/6/22.
 */

'use strict';

const { ServiceBroker } = require('moleculer');
const { MoleculerError } = require('moleculer').Errors;

const uuid = require('uuid');
jest.mock('uuid', () => ({
	v4: () => '00000000-0000-0000-0000-000000000000',
}));

const TestService = require('../../../services/users.service');

describe(`Test 'greeter' service`, () => {
	let broker = new ServiceBroker({ logger: false });
	let usersService = broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe(`Test 'users.getAll' action`, () => {

		it(`should successful get all user data`, async () => {
			usersService.adapter.find = jest.fn(() => ([
				{
					_id: 'OuWdubvPrKIuZbTS',
					id: '00000000-0000-0000-0000-000000000000',
					email: 'admin@example.com',
					name: 'admin',
					family: 'admin',
					age: 20,
					info: 'I am system administrator',
				},
			]));

			const res = await broker.call('users.getAll');

			expect(usersService.adapter.find).toBeCalled();
			expect(res.length).toEqual(1);
			expect(res[0]._id).toBeUndefined();
		});

	});

	describe(`Test 'users.getById' action`, () => {

		it(`should error get user by id when id invalid`, async () => {
			const params = { id: '0' };
			let error;

			try {
				await broker.call('users.getById', params);
			} catch (e) {
				error = e;
			}

			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('VALIDATION_ERROR');
		});

		it(`should error get user by id when not found`, async () => {
			const params = { id: '10ba038e-48da-487b-96e8-8d3b99b6d18a' };
			usersService.adapter.findOne = jest.fn(() => ({}));
			let error;

			try {
				await broker.call('users.getById', params);
			} catch (e) {
				error = e;
			}

			expect(usersService.adapter.findOne).toBeCalled();
			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('NOT_FOUND_ERROR');
		});

		it(`should successful get all user data`, async () => {
			const params = { id: '00000000-0000-0000-0000-000000000000' };
			usersService.adapter.findOne = jest.fn(() => ({
				_id: 'OuWdubvPrKIuZbTS',
				id: '00000000-0000-0000-0000-000000000000',
				email: 'admin@example.com',
				name: 'admin',
				family: 'admin',
				age: 20,
				info: 'I am system administrator',
			}));

			const res = await broker.call('users.getById', params);

			expect(usersService.adapter.findOne).toBeCalled();
			expect(res._id).toBeUndefined();
			expect(res.id).toEqual('00000000-0000-0000-0000-000000000000');
		});

	});

	describe(`Test 'users.create' action`, () => {

		it(`should error create user when send invalid data`, async () => {
			const params = {};
			let error;

			try {
				await broker.call('users.create', params);
			} catch (e) {
				error = e;
			}

			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('VALIDATION_ERROR');
		});

		it(`should error create user when use duplicate email`, async () => {
			const params = {
				email: 'admin@example.com',
				name: 'root',
				family: 'root',
				age: 20,
				info: 'I am system administrator',
			};
			usersService.adapter.findOne = jest.fn(() => ({
				_id: 'OuWdubvPrKIuZbTS',
				id: '00000000-0000-0000-0000-000000000000',
				email: 'admin@example.com',
				name: 'admin',
				family: 'admin',
				age: 20,
				info: 'I am system administrator',
			}));
			let error;

			try {
				await broker.call('users.create', params);
			} catch (e) {
				error = e;
			}

			expect(usersService.adapter.findOne).toBeCalled();
			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('EXIST_ERROR');
		});

		it(`should successfully create user`, async () => {
			const params = {
				email: 'root@example.com',
				name: 'root',
				family: 'root',
				age: 20,
				info: 'I am root administrator',
			};
			usersService.adapter.findOne = jest.fn(() => ({}));
			usersService.adapter.insert = jest.fn(() => ({
				_id: 'OuWdubvPrKIuZbTS',
				id: '00000000-0000-0000-0000-000000000000',
				email: 'admin@example.com',
				name: 'admin',
				family: 'admin',
				age: 20,
				info: 'I am system administrator',
			}));

			const res = await broker.call('users.create', params);

			expect(usersService.adapter.findOne).toBeCalled();
			expect(usersService.adapter.insert).toBeCalled();
			expect(res._id).toBeUndefined();
			expect(res.id).toEqual('00000000-0000-0000-0000-000000000000');
		});

	});

	describe(`Test 'users.update' action`, () => {

		it(`should error update user when send invalid data`, async () => {
			const params = {};
			let error;

			try {
				await broker.call('users.update', params);
			} catch (e) {
				error = e;
			}

			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('VALIDATION_ERROR');
		});

		it(`should error update user when record not found`, async () => {
			const params = { id: '00000000-0000-0000-0000-000000000000' };
			usersService.adapter.findOne = jest.fn(() => ({}));
			let error;

			try {
				await broker.call('users.update', params);
			} catch (e) {
				error = e;
			}

			expect(usersService.adapter.findOne).toBeCalled();
			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('NOT_FOUND_ERROR');
		});

		it(`should successful update user`, async () => {
			const params = { id: '00000000-0000-0000-0000-000000000000', name: 'root' };
			usersService.adapter.findOne = jest.fn(() => ({
				_id: 'OuWdubvPrKIuZbTS',
				id: '00000000-0000-0000-0000-000000000000',
				email: 'admin@example.com',
				name: 'admin',
				family: 'admin',
				age: 20,
				info: 'I am system administrator',
			}));
			usersService.adapter.updateById = jest.fn(() => ({
				_id: 'OuWdubvPrKIuZbTS',
				id: '00000000-0000-0000-0000-000000000000',
				email: 'admin@example.com',
				name: params.name,
				family: 'admin',
				age: 20,
				info: 'I am system administrator',
			}));

			await broker.call('users.update', params);

			expect(usersService.adapter.findOne).toBeCalled();
			expect(usersService.adapter.updateById).toBeCalled();
			expect(usersService.adapter.updateById).toBeCalledWith('OuWdubvPrKIuZbTS', expect.any(Object));
		});

	});

	describe(`Test 'users.delete' action`, () => {
		it(`should error delete user when send invalid data`, async () => {
			const params = {};
			let error;

			try {
				await broker.call('users.delete', params);
			} catch (e) {
				error = e;
			}

			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('VALIDATION_ERROR');
		});

		it(`should error delete user when record not found`, async () => {
			const params = { id: '00000000-0000-0000-0000-000000000000' };
			usersService.adapter.findOne = jest.fn(() => ({}));
			let error;

			try {
				await broker.call('users.delete', params);
			} catch (e) {
				error = e;
			}

			expect(usersService.adapter.findOne).toBeCalled();
			expect(error).toBeInstanceOf(MoleculerError);
			expect(error.type).toEqual('NOT_FOUND_ERROR');
		});

		it(`should successful delete user`, async () => {
			const params = { id: '00000000-0000-0000-0000-000000000000', name: 'root' };
			usersService.adapter.findOne = jest.fn(() => ({
				_id: 'OuWdubvPrKIuZbTS',
				id: '00000000-0000-0000-0000-000000000000',
				email: 'admin@example.com',
				name: 'admin',
				family: 'admin',
				age: 20,
				info: 'I am system administrator',
			}));
			usersService.adapter.removeById = jest.fn(() => ({}));

			await broker.call('users.delete', params);

			expect(usersService.adapter.findOne).toBeCalled();
			expect(usersService.adapter.updateById).toBeCalled();
			expect(usersService.adapter.removeById).toBeCalledWith('OuWdubvPrKIuZbTS');
		});
	});

});

