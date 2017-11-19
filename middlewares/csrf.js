const csrf = require('koa2-csrf').default;

exports.init = app => app.use(csrf({
	invalidStatusCode: 403,
	invalidTokenMessage: 'Invalid CSRF token',
	ignoreMethods: [ 'GET', 'HEAD','OPTIONS' ],
	ignorePaths: [],
	secretLength: 16,
	saltRounds: 10
}));
