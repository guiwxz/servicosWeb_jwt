const { Router } = require('express');

const productsController = require('./controllers/products');
const salesController = require("./controllers/sales");
const auth = require('./controllers/auth');

const routes = new Router();

routes.route('/login').post(auth.login);

routes.route('/products').get(auth.verifyJWT, productsController.getProdutos);
routes.route('/products').post(auth.verifyJWT, productsController.addProduto);
routes.route('/products/:codigo').put(auth.verifyJWT, productsController.updateProduto);
routes.route('/products/:codigo').delete(auth.verifyJWT, productsController.deleteProduto);
routes.route('/products/:codigo').get(auth.verifyJWT, productsController.getProduto);

routes.route('/sales').get(auth.verifyJWT, salesController.getVendas);
routes.route('/sales').post(auth.verifyJWT, salesController.addVenda);
routes.route('/sales/:codigo').delete(auth.verifyJWT, salesController.deleteVenda);
routes.route('/sales/:codigo').put(auth.verifyJWT, salesController.updateVenda);
routes.route('/sales/:codigo').get(auth.verifyJWT, salesController.getVenda);

module.exports = routes;