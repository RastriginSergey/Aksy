const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('config');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: 'Enter email'
		},
		displayName: {
			type: String,
			required: 'Enter displayName',
		},
		passwordHash: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

userSchema.virtual('password')
	.set(function (password) {

		if (password !== undefined) {

			if (password.length < 4) {
				this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
			}
		}

		this._plainPassword = password;

		if (password) {

			const saltLength = config.crypto.hash.length;
			this.salt = crypto.randomBytes(saltLength).toString('base64');

			this.passwordHash = crypto.pbkdf2Sync(
				password,
				this.salt,
				config.crypto.hash.iterations,
				config.crypto.hash.length,
				'sha256'
			).toString('base64');
		} else {

			this.salt = undefined;
			this.passwordHash = undefined;
		}
	})
	.get(() => this._plainPassword);

userSchema.methods.checkPassword = function (password) {

	if (!password) return false;
	if (!this.passwordHash) return false;

	return crypto.pbkdf2Sync(
		password,
		this.salt,
		config.crypto.hash.iterations,
		config.crypto.hash.length,
		'sha256'
	).toString('base64') === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);