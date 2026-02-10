const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products')

router.get('/', productsController.getAllProducts);
router.post('/', productsController.postProduct);
router.get('/:id', productsController.getProduct);
router.patch('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;