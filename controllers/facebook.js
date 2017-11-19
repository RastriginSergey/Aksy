const passport = require('koa-passport');
const config = require('config');


module.exports = {

	async authenticate(ctx, next) {
		await passport.authenticate('facebook', config.providers.facebook.passportOptions)(ctx, next);
	},

	async authorize(ctx, next) {
		await passport.authorize('facebook', config.providers.facebook.passportOptions)(ctx, next);
	},

	async oauth(ctx, next) {
		await passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/',
			failureFlash: true
		})(ctx, next);
	}

};