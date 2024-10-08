const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, required: true },
    salePrice: { type: Number } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
