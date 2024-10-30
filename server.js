const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { productList } = require('./data/products.js');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/products', (req, res) => {
  res.json(productList);
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  // Here you would typically update a database or session
  // For this example, we'll just send back a success message
  res.json({ message: 'Product added to cart', productId, quantity });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
