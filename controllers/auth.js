const passport = require('koa-passport');
const uuid = require('uuid/v1');
const config = require('config');
const User = require('../models/user');
const sendMail = require('../libs/nodemailer');

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

		const verifiedToken = uuid();

		const {email, displayName, password} = ctx.request.body;

		const user = new User({
			email,
			displayName,
			password,
			verified: false,
			verifiedToken
		});

		try {
			await user.save();
		} catch (err) {
			if (err.name === 'ValidationError') {
				let errorMessages = '';
				for(let key in err.errors) {
					if (err.errors.hasOwnProperty(key)) {
						errorMessages += `${key}: ${err.errors[key].message}</br>`;
					}
				}
				ctx.flash('error', errorMessages);
				ctx.redirect('/signup');
			} else {
				ctx.throw(err);
			}
		}

		try {

			const {name, user} = config.smtp;

			await sendMail({
				template: 'verify-registration-email',
				name,
				user,
				to: user.email,
				subject: 'Подтверждение email',
				locals: {
					link: config.server.siteHost + '/verify-email/' + verifiedToken
				}
			});

			ctx.body = 'Вы зарегистрированы. Пожалуйста, загляните в почтовый ящик, там письмо с Email-подтверждением.';

		} catch (e) {
			ctx.throw(e);
		}
	},

	async logout(ctx) {
		await ctx.logout();
		ctx.session = null;
		ctx.redirect('/signin');
	},

	async verify(ctx) {
		try {
			const {verifiedToken} = ctx.params;
			const user = await User.findOne({verifiedToken});

			if (user) {
				user.verified = true;
				await user.save();
				await ctx.login(user);
				ctx.redirect('/');
			} else {
				ctx.throw('Bad token');
			}
		} catch (e) {
			ctx.throw(e);
		}
	}
};


module.exports = auth;