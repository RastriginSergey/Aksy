const passport = require('koa-passport');
const User = require('../models/user');

const auth = {

	async renderSignin(ctx) {
		ctx.body = ctx.render('signin');
	},

	async renderSignup(ctx) {
		ctx.body = ctx.render('signup');
	},

	async signin(ctx, next) {
		await passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		})(ctx, next);
	},

	async signup(ctx) {
		try {
			const {email, displayName, password} = ctx.request.body;
			const user = await User.create({
				email, displayName, password
			});

			await ctx.login(user);
			ctx.redirect('/');
		} catch (err) {
			if (err.name !== 'ValidationError') throw err;

			ctx.throw(400);
		}
	},

	async logout(ctx) {
		await ctx.logout();
		ctx.session = null;
		ctx.redirect('/signin');
	}
};


module.exports = auth;