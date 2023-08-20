const {Router} = require('express');
const { 
    getAllProducts, getProductById, createNewCategory, 
    getAllCategories, createNewProduct, updateProduct, 
    deleteProduct } = require('../Controllers/productsController');
const productRouter = Router();

// products
productRouter.get('/', getAllProducts);
productRouter.post('/', createNewProduct);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

// categories
productRouter.post('/category', createNewCategory)
productRouter.get('/category/all', getAllCategories)

module.exports = {
    productRouter
}