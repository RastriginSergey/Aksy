const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const User = require('../../models/user');

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	_passReqToCallback: true
},
(email, password, done) => {

	User.findOne({email}, (err, user) => {
		if (err) done(err);

		if (!user || !user.checkPassword(password)) {
			done(null, false, {message: 'Нет пользователя или пароль неверен'});
		}

		done(null, user);
	});
}
));