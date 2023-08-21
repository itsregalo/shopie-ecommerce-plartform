const {Router} = require('express');
const { 
    getAllProducts, getProductById, createNewCategory, 
    getAllCategories, createNewProduct, updateProduct, 
    deleteProduct, 
    add_to_cart} = require('../Controllers/productsController');
const { customeregister, login, adminregister } = require('../Controllers/Auth.controller');
const productRouter = Router();

//Authentication
productRouter.post('/register', customeregister);
productRouter.post('/login', login);
productRouter.post('/adminregister', adminregister);



// products
productRouter.get('/', getAllProducts);
productRouter.post('/', createNewProduct);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

// categories
productRouter.post('/category', createNewCategory)
productRouter.get('/category/all', getAllCategories)

productRouter.post('/add-to-cart', add_to_cart)

module.exports = {
    productRouter
}