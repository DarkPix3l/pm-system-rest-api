const productsList = require('./data/data.js');

const express = require("express");
const app = express();
const PORT = 3001;


//Middleware global before any request. this will convert the body to json.
app.use(express.json());



//Home route
app.get("/", (req, res) => {
  const intro = `<h1>Welcome to our Shop!</h1>
        <p>Check out our <a href="/products">Products List</a></p>
        <p>Or login <a href="/login">here</a></p>
        <p>Don't have an account? Please signup <a href="/signup">here</a></p>`;
  res.send(intro)
});

// Product & Order routes
const productRoutes = require("./routers/products.js");
app.use("/products", productRoutes);


//Dummy auth pages as authtentication it is not required now
app.get("/signup", (req, res) => {res.send("<h2>Signup page - Coming soon!</h2>");});
app.get("/login", (req, res) => {res.send("<h2>Login page - Coming soon!</h2>");});



// Error handler middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
// Start server
app.listen(PORT, () => {
  console.log("Server running on port 3001");
});