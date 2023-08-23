const {Router} = require('express');
const { 
    getAllProducts, getProductById, createNewCategory, 
    getAllCategories, createNewProduct, updateProduct, 
    deleteProduct, 
    add_to_cart} = require('../Controllers/productsController');
const { customeregister, login, adminregister } = require('../Controllers/Auth.controller');
const { forgotPassword} = require('../Controllers/forgotpwd.controller');
const { verifyToken } = require('../Middleware/verifyToken');
const productRouter = Router();

//Authentication
productRouter.post('/register', customeregister);
productRouter.post('/login', login);
productRouter.post('/adminregister', adminregister);
productRouter.post('/forgot-password', forgotPassword);

// products
productRouter.get('/', getAllProducts);
productRouter.post('/', verifyToken, createNewProduct);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', verifyToken,updateProduct);
productRouter.delete('/:id', verifyToken, deleteProduct);

// categories
productRouter.post('/category', verifyToken, createNewCategory)
productRouter.get('/category/all', getAllCategories)

productRouter.post('/add-to-cart', add_to_cart)

module.exports = {
    productRouter
}