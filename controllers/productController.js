const Product = require('../models/productModel');

const productController = {
    createProduct: async (req, res) => {
        try {
            const result = await Product.create(req.body);
            res.status(201).json({ message: 'Product created', productId: result.productId });
        } catch (error) {
            console.log('createProduct', error)
            res.status(500).json({ error: 'Could not create product' });
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.get(req.params.id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Could not retrieve product' });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.update(req.params.id, req.body);
            res.json({ message: 'Product updated', data: updatedProduct });
        } catch (error) {
            console.log('updateProduct', error)
            res.status(500).json({ error: 'Could not update product' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.delete(req.params.id);
            res.json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Could not delete product' });
        }
    },

    listProducts: async (req, res) => {
        console.log('reaching to the list endpoint')
        try {
            const limit = parseInt(req.query.limit) || 10;
            const lastEvaluatedKey = req.query.lastEvaluatedKey ? JSON.parse(req.query.lastEvaluatedKey) : null;

            const result = await Product.list(limit, lastEvaluatedKey);
            res.json({
                items: result.items,
                lastEvaluatedKey: result.lastEvaluatedKey
            });
        } catch (error) {
            console.log('listProducts', error)
            res.status(500).json({ error: 'Could not list products' });
        }
    }
};

module.exports = productController;
