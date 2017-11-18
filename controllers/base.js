module.exports.renderWelcome = async (ctx) => {
	if (ctx.isAuthenticated()) {
		ctx.body = ctx.render('welcome');
	} else {
		ctx.redirect('/signin');
	}
};