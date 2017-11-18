const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {

	async getUser(ctx) {

		const {id} = ctx.params;

		if (!mongoose.Types.ObjectId.isValid(id)) ctx.throw(400, 'Invalid id');
		const user = await User.findById({_id: id}, {email: true, displayName: true});

		if (!user) ctx.status = 404;

		ctx.body = user;
	},

	async getUsers(ctx) {
		ctx.body = await User.find({}, {email: true, displayName: true});
	},

	async updateUser(ctx) {

		const {id} = ctx.params;
		const {email, displayName} = ctx.request.body;

		if (!mongoose.Types.ObjectId.isValid(id)) ctx.throw(400, 'Invalid id');

		const user = await User.findById({_id: id});
		if (!user) ctx.throw(404, 'User not found');

		await User.update({_id: id}, {email, displayName});
		ctx.status = 200;
	},

	async deleteUser(ctx) {

		const {id} = ctx.params;

		if (!mongoose.Types.ObjectId.isValid(id)) ctx.throw(400, 'Invalid id');

		const user = await User.findOne({_id: id});

		if (!user) ctx.throw(404, 'User not found');

		await User.remove(user);
		ctx.status = 200;
	}
};