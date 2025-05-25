const express = require("express");
const router = express.Router();
const productsList = require("../data/data.js");
const orders = []; 

// POST /orders – Create a new order
router.post("/", (req, res) => {
  const { productIds } = req.body;
//validation
  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ error: "Product IDs are required." });
  }

  // Get the product details
  const orderedProducts = productIds.map(id => productsList.find(p => p.id === id)).filter(p => p);

  if (orderedProducts.length !== productIds.length) {
    return res.status(404).json({ error: "One or more product IDs are invalid." });
  }

  const totalPrice = orderedProducts.reduce((sum, item) => sum + item.price, 0);

  const newOrder = {
    id: (orders.length + 1).toString(),
    products: orderedProducts,
    totalPrice,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// GET /orders – Retrieve all orders
router.get("/", (req, res) => {
  res.json(orders);
});

module.exports = router;