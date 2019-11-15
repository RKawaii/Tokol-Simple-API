const Ajv = require('ajv');
const ajv = new Ajv();

module.exports.body = (cast) => {
	return (req, res, next) => {
		const { body } = req;
		if (ajv.validate(cast, body)) {
			next();
		} else res.sendStatus(400);
	};
};
module.exports.params = (cast) => {
	return (req, res, next) => {
		const { params } = req;
		if (ajv.validate(cast, params)) {
			next();
		} else res.sendStatus(400);
	};
};
module.exports.query = (cast) => {
	return (req, res, next) => {
		const { query } = req;
		if (ajv.validate(cast, query)) {
			next();
		} else res.sendStatus(400);
	};
};
