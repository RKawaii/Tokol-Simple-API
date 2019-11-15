const Route = require('express').Router();
const admin = require('./connection/admin');
const auth = require('./middleware/auth').auth;

Route.route('/produk').get((req, res) => {
	admin.get(req, res, 'produk');
});
Route.route('/produk/:id').get((req, res) => {
	admin.get(req, res, 'produk');
});
Route.route('/produk').post(auth, (req, res) => {
	admin.add(req, res, 'produk');
});
Route.route('/produk/:id').put(auth, (req, res) => {
	admin.upd(req, res, 'produk');
});
Route.route('/produk/:id').delete(auth, (req, res) => {
	admin.del(req, res, 'produk');
});

module.exports = Route;
