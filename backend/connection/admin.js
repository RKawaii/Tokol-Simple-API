const model = require('../models/admin');
const enc = require('../middleware/encrypt').default;
const cmp = require('../middleware/auth').login;
const jwt = require('jsonwebtoken');
const keys = require('../config/jwt.keys');

const getData = (path, body) => {
	let data;
	switch (path) {
		case 'jenis_produk':
			data = { nama: body.jenis_produk };
			break;
		case 'produk':
			data = {
				nama: body.nama,
				jenis_id: body.jenis_id,
				harga: body.harga,
				deskripsi: body.deskripsi
			};
			break;
		case 'pembelian':
			data = {
				produk_id: body.produk_id,
				user_id: body.user_id,
				jumlah: body.jumlah,
				status: body.status
			};
			break;
		case 'user':
			data = {
				email: body.email,
				password: enc(body.password)
			};
			break;
	}
	return data;
};

const get = (req, res, path) => {
	const { params, query } = req;
	let cond = {};
	if (params.id !== undefined) {
		cond.where.id = params.id;
	}
	cond.limit = 10;
	if (query.overrideLimit === true) {
		if (typeof query.limit === 'number') {
			cond.limit = query.limit ? query.limit : 10;
		}
	}
	if (typeof query.offset === 'number') {
		cond.offset = query.offset ? query.offset : 0;
	}

	model(path)
		.findAll(cond)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const add = (req, res, path) => {
	const { body } = req;
	const data = getData(path, body);

	model(path)
		.create(data)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const upd = (req, res, path) => {
	const { body } = req;
	const { params } = req;
	let cond = {};
	cond.where.id = params.id;

	const data = getData(path, body);

	model(path)
		.update(data, cond)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const del = (req, res, path) => {
	const { params } = req;
	model(path)
		.destroy({ where: { id: params.id } })
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('ERROR');
		});
};

const login = (req, res) => {
	const { body } = req;
	model('admin')
		.findOne({ where: { username: body.username } })
		.then((r) => {
			if (cmp(body.password, r.password)) {
				const token = jwt.sign(
					{
						role: 'admin',
						id: r.id
					},
					keys,
					{ expiresIn: '5h' }
				);
				res.json({ loggedAs: 'model', token: token });
			} else res.sendStatus(422);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
};

module.exports = {
	get: get,
	add: add,
	upd: upd,
	del: del,
	login: login
};
