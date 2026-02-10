const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products')

router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.postProduct);
router.get('/products/:id', productsController.getProduct);
router.patch('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;