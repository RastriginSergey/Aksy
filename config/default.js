const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
	secret: 'mySecretBlabla',
	PORT: 3000,
	bdURL: 'mongodb://localhost/test',
	server: {
		siteHost: 'http://localhost:3000'
	},
	crypto: {
		hash: {
			length: 128,
			// may be slow(!): iterations = 12000 take ~60ms to generate strong password
			iterations: process.env.NODE_ENV === 'production' ? 12000 : 1
		}
	},
	template: {
		// template.root uses config.root
		root: defer(function (cfg) {
			return path.join(cfg.root, 'templates');
		})
	},
	root: process.cwd(),
	providers: {
		facebook: {
			appId: 126165151413304,
			appSecret: 'f8c30d8e572d65d9ae6f2275155ed6c4',
			passportOptions: {
				display: 'popup',
				scope: ['email']
			}
		}
	}
};