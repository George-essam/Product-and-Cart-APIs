const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', cartRoutes);

mongoose.connect('mongodb://localhost:27017/shop')
.then(() => app.listen(3000, () => console.log('Server started on port 3000')))
.catch(err => console.error(err));
