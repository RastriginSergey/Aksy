const favicon = require('./favicon');
const logger = require('./logger');
const staticFiles = require('./static');
const templates = require('./templates');
const errors = require('./errors');
const mongooseSession = require('./mongoose-session');
const bodyParser = require('./bodyParser');
const passport = require('./passport-init');
const flash = require('./flash');
const csrf = require('./csrf');

exports.init = (app) => {
	favicon.init(app);
	logger.init(app);
	staticFiles.init(app);
	templates.init(app);
	errors.init(app);
	mongooseSession.init(app);
	bodyParser.init(app);
	passport.init(app);
	flash.init(app);
	csrf.init(app);
};