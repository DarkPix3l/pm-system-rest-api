const express = require("express");
const router = express.Router();
const productsList = require("../data/data.js");



// GET all products
router.get("/", (req, res) => {
  res.json(productsList);
});

// POST create product (no auth)
router.post("/", (req, res) => {
  const { name, description, price, quantity } = req.body;
  if (!name || !description || price == null || quantity == null) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newProduct = {
    id: (productsList.length + 1).toString(),
    name,
    description,
    price,
    quantity,
    createdAt: new Date().toISOString(),
  };

  productsList.push(newProduct);
  res.status(201).json(newProduct);
});

//GET 1 products
router.get("/:id", (request, response) => {
  const id = request.params.id; // ← get id from URL
  const product = productsList.find((item) => item.id === id);

  if (product) {
    response.json(product);
  } else {
    response.status(404).json({ message: "Product not found" });
  }
});




// PUT update product
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = productsList.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const { name, description, price, quantity } = req.body;
  productsList[index] = { ...productsList[index], name, description, price, quantity };
  res.json(productsList[index]);
});

// DELETE product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = productsList.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const deleted = productsList.splice(index, 1);
  res.json({ message: "Product deleted", deleted });
});

module.exports = router;
