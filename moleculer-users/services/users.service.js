/**
 * Created by pooya on 2/6/22.
 */

'use strict';

const { MoleculerError } = require('moleculer').Errors;
const DbMixin = require('../mixins/db.mixin');
const uuid = require('uuid');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: 'users',

	mixins: [DbMixin('users')],

	settings: {
		fields: [
			'_id',
			'id',
			'email',
			'name',
			'family',
			'age',
			'info',
		],

		entityValidator: {
			id: 'string',
			email: 'string|email',
			name: 'string|min:3',
			family: 'string|min:3',
			age: 'number|positive|min:18',
			info: 'string',
		},
	},

	dependencies: [],

	actions: {
		getAll: {
			async handler() {
				const data = await this.adapter.find({});

				return data.map((v) => {
					delete v._id;

					return v;
				});
			},
		},

		getById: {
			params: {
				id: { type: 'uuid' },
			},
			async handler(ctx) {
				const found = await this.adapter.findOne({ id: ctx.params.id });
				if (!Object.hasOwnProperty.call((found || {}), '_id')) {
					throw new MoleculerError('Not found', 404, 'NOT_FOUND_ERROR');
				}

				delete found['_id'];

				return found;
			},
		},

		create: {
			params: {
				email: { type: 'email' },
				name: { type: 'string', min: 3 },
				family: { type: 'string', min: 3 },
				age: { type: 'number', min: 18 },
				info: { type: 'string' },
			},
			async handler(ctx) {
				ctx.params.id = uuid.v4();

				const data = await this.adapter.insert(ctx.params);

				delete data['_id'];

				return data;
			},
		},

		update: {
			params: {
				id: { type: 'uuid' },
				name: { type: 'string', min: 3, optional: true },
				family: { type: 'string', min: 3, optional: true },
				age: { type: 'number', min: 18, optional: true },
				info: { type: 'string', optional: true },
			},
			async handler(ctx) {
				const found = await this.adapter.findOne({ id: ctx.params.id });
				if (!Object.hasOwnProperty.call((found || {}), '_id')) {
					throw new MoleculerError('Not found', 404, 'NOT_FOUND_ERROR');
				}

				delete ctx.params.id;
				delete ctx.params.email;

				const json = await this.adapter.updateById(found['_id'], { '$set': ctx.params });
				await this.entityChanged('updated', json, ctx);

				return true;
			},
		},

		delete: {
			params: {
				id: { type: 'uuid' },
			},
			async handler(ctx) {
				const found = await this.adapter.findOne({ id: ctx.params.id });
				if (!Object.hasOwnProperty.call((found || {}), '_id')) {
					throw new MoleculerError('Not found', 404, 'NOT_FOUND_ERROR');
				}

				await this.adapter.removeById(found['_id']);
				await this.entityChanged('deleted', found, ctx);
			},
		},
	},

	hooks: {
		before: {
			async create(ctx) {
				const found = await this.adapter.findOne({ email: ctx.params.email });
				if (Object.hasOwnProperty.call((found || {}), '_id')) {
					throw new MoleculerError('Your object already exists!', 400, 'EXIST_ERROR');
				}
			},
		},
	},

	events: {},

	methods: {
		async seedDB() {
			await this.adapter.insertMany([
				{
					_id: 'OuWdubvPrKIuZbTS',
					id: '00000000-0000-0000-0000-000000000000',
					email: 'admin@example.com',
					name: 'admin',
					family: 'admin',
					age: 20,
					info: 'I am system administrator',
				},
			]);
		},
	},

	created() {

	},

	async started() {

	},

	async stopped() {

	},
};
