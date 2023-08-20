const {v4} = require('uuid');
const { mssql, sqlConfig } = require('../Config/Config');

const createNewCategory = async (req, res) => {
    try {
        const { category_name } = req.body

        // validating all required fields are filled
        if (!category_name) {
            return res.status(400).json({
                error: 'Please provide name of category'
            })
        }

        const pool = await mssql.connect(sqlConfig)

        // checking if category already exists
        const categoryExists = await pool.request()
                .input('category_name', mssql.VarChar, category_name)
                .execute('get_category_by_name')

        if (categoryExists.recordset[0]) {
            return res.status(400).json({
                error: 'Category already exists'
            })
        }

        const category = await pool.request()
                .input('id', mssql.VarChar, v4())
                .input('category_name', mssql.VarChar, category_name)
                .execute('create_category')

        res.status(200).json({
            message: 'Category created successfully'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const categories = await pool.request()
                .execute('get_all_categories')

        res.status(200).json({
            categories: categories.recordset
        })
    }

    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const getAllProducts = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        const products = await pool.request()
                .execute('get_all_products')

        res.status(200).json({
            products: products.recordset
        })
    }

    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await mssql.connect(sqlConfig)
        const product = await pool.request()
                .input('product_id', mssql.VarChar, id)
                .execute('get_product_by_id')

        // if product is not found
        if (!product.recordset[0]) {
            return res.status(404).json({
                error: 'Product not found'
            })
        }

        res.status(200).json({
            product: product.recordset[0]
        })

    }
    
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const createNewProduct = async (req, res) => {
    try {
        const { 
            product_name, product_description,
            product_category_id, product_initial_price,
            product_price, product_image, product_stock
         } = req.body

         // validating all required fields are filled
        if (!product_name || !product_description || !product_category_id || !product_price || !product_image || !product_stock) {
            return res.status(400).json({
                error: 'Please provide all required fields'
            })
        }

        const pool = await mssql.connect(sqlConfig)
        const product = await pool.request()
                .input('id', mssql.VarChar, v4())
                .input('product_name', mssql.VarChar, product_name)
                .input('product_description', mssql.VarChar, product_description)
                .input('product_category_id', mssql.VarChar, product_category_id)
                .input('product_initial_price', mssql.Int, product_initial_price)
                .input('product_price', mssql.Int, product_price)
                .input('product_image', mssql.VarChar, product_image)
                .input('product_stock', mssql.Int, product_stock)
                .execute('add_product')

        res.status(200).json({
            message: 'Product created successfully',
        })
    }
    
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { 
            product_name, product_description,
            product_category_id, product_initial_price,
            product_price, product_image, product_stock
         } = req.body


         // validating all required fields are filled
        if (!product_name || !product_description || !product_category_id || !product_price || !product_image || !product_stock) {
            return res.status(400).json({
                error: 'Please provide all required fields'
            })
        }

        const pool = await mssql.connect(sqlConfig)
        const product = await pool.request()
                .input('id', mssql.VarChar, id)
                .input('product_name', mssql.VarChar, product_name)
                .input('product_description', mssql.VarChar, product_description)
                .input('product_category_id', mssql.VarChar, product_category_id)
                .input('product_initial_price', mssql.Int, product_initial_price)
                .input('product_price', mssql.Int, product_price)
                .input('product_image', mssql.VarChar, product_image)
                .input('product_stock', mssql.Int, product_stock)
                .execute('update_product')

        res.status(200).json({
            message: 'Product updated successfully',
        })
    }
    
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const pool = await mssql.connect(sqlConfig)

        // checking if product exists
        const productExists = await pool.request()
                .input('product_id', mssql.VarChar, id)
                .execute('get_product_by_id')

        if (!productExists.recordset[0]) {
            return res.status(404).json({
                error: 'Product not found'
            })
        }

        const product = await pool.request()
                .input('product_id', mssql.VarChar, id)
                .execute('delete_product')

        res.status(200).json({
            message: 'Product deleted successfully',
        })
    }
    
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createNewCategory,
    createNewProduct,
    getAllCategories,
    updateProduct,
    deleteProduct
}
