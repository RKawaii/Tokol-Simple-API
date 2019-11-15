const sequelize = require('sequelize');
const admin = require('../config/db.config');

const db = new sequelize(admin.database, admin.username, admin.password, {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: (log) => {
		console.log(log);
	}
});

db.authenticate()
	.then(() => {
		console.log('admin Connection has been established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = db;
