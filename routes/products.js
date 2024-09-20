const express = require('express');
const Product = require('../models/Product');
const router = express.Router();


//view products
router.get('/products', async (req, res) => {
    try { 
        const products = await Product.find();
        res.status(200).json(products);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new product
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Edit or update a product
router.put('/products/:id', async (req, res) => {
    try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
