// no templates in ctx example
const pug = require('pug');
const path = require('path');
const config = require('config');

exports.init = app => app.use(async (ctx, next) => {

	/* default helpers */
	ctx.locals = {
		/* at the time of ctx middleware, user is unknown, so we make it a getter */
		get user() {
			return ctx.req.user; // passport sets ctx
		},

		get flash() {
			return ctx.flash();
		},

		get csrf() {
			return ctx.csrf;
		}
	};

	// in the future we'll extend this
	ctx.render = function (templatePath, locals) {

		locals = locals || {};

		const localsFull = Object.create(ctx.locals);

		for (const key in locals) {
			if (locals.hasOwnProperty(key)) {
				localsFull[key] = locals[key];
			}
		}

		const templatePathResolved = path.join(config.template.root, templatePath + '.pug');

		return pug.renderFile(templatePathResolved, localsFull);
	};

	await next();
});
