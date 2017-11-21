const nodemailer = require('nodemailer');
const config = require('config');
const juice = require('juice');
const pug = require('pug');
const path = require('path');
const {host, port, secure, user, password: pass} = config.smtp;
const Email = require('../../models/email');

let smtpConfig = {
	host,
	port,
	secure,
	auth: {
		user,
		pass,
	}
};

const transporter = nodemailer.createTransport(smtpConfig);

const sendMail = async (options) => {

	const {name, user, to, subject, template} = options;
	const locals = options.locals || {};
	const templatePath = path.join(config.template.root, 'email', template) + '.pug';

	const html = pug.renderFile(templatePath, locals);

	const message = {
		from: `${name} <${user}>`,
		to,
		subject,
		html: juice(html)
	};

	const transportResponse = await transporter.sendMail(message);

	return await Email.create({
		message,
		transportResponse,
		messageId: transportResponse.messageId
	});
};

module.exports = sendMail;