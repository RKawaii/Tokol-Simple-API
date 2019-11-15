const sequelize = require('sequelize');
const conf = require('../config/model.config');
const db = require('../database/admin');

const admin = db.define(
	'admin',
	{
		nickname: {
			type: sequelize.STRING,
			allowNull: false
		},
		password: {
			type: sequelize.STRING,
			allowNull: false
		}
	},
	conf
);
const jenis_produk = db.define(
	'jenis_produk',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nama: {
			type: sequelize.STRING,
			allowNull: false
		}
	},
	conf
);
const produk = db.define(
	'produk',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nama: {
			type: sequelize.STRING,
			allowNull: false
		},
		jenis_id: { type: sequelize.INTEGER, allowNull: false },
		harga: { type: sequelize.INTEGER, allowNull: false },
		deskripsi: { type: sequelize.TEXT },
		gambar: { type: sequelize.STRING }
	},
	conf
);
const pembelian = db.define(
	'pembelian',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		produk_id: { type: sequelize.INTEGER, allowNull: false },
		user_id: { type: sequelize.INTEGER, allowNull: false },
		jumlah: { type: sequelize.INTEGER, allowNull: false },
		status: { type: sequelize.STRING, allowNull: false }
	},
	conf
);
const user = db.define(
	'user',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		email: {
			type: sequelize.STRING,
			allowNull: false
		},
		password: {
			type: sequelize.STRING,
			allowNull: false
		}
	},
	conf
);

module.exports = (reqMod) => {
	switch (reqMod) {
		case 'admin':
			return admin;
		case 'jenis_produk':
			return jenis_produk;
		case 'produk':
			return produk;
		case 'pembelian':
			return pembelian;
		case 'user':
			return user;
		default:
			return undefined;
	}
};
