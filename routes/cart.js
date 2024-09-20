const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();



// Add product to cart
router.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (quantity > product.quantity) {
      return res.status(400).json({ error: 'Quantity is more than products available' });
    }

    let cart = await Cart.findOne(); 
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      const newQuantity = cart.items[itemIndex].quantity + quantity;
      if (newQuantity > product.quantity) {
        return res.status(400).json({ error: 'Quantity is more than products available' });
      }
      cart.items[itemIndex].quantity = newQuantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Update product quantity in cart
router.put('/cart/:productId', async (req, res) => {
  const { quantity } = req.body;
  try {
    let cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const productId = req.params.productId
    const product = await Product.findById(productId);
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.params.productId);
    if (itemIndex > -1) {
      if(quantity > product.get('quantity')){ return res.status(404).json({ error: 'Quantity is more than products available'})}
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Product not in cart' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product from cart
router.delete('/cart/:productId', async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.params.productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.status(200).json({message: 'product deleted succefully'});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get cart with subtotal and total
router.get('/cart', async (req, res) => {
  try {
    let cart = await Cart.findOne().populate('items.productId');
    if (!cart) return res.json({ items: [], subtotal: 0, total: 0 });

    let subtotal = 0, total = 0;
    cart.items.forEach(item => {
      const product = item.productId;
      const price = product.salePrice || product.price;
      subtotal += price * item.quantity;
    });

    total = subtotal;
    res.json({ items: cart.items, subtotal, total });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
