const productsList = require('./data/data.js');


const express = require("express");
const app = express();
const PORT = 3001;

//Middleware global before any request. this will convert the body to json.
app.use(express.json());

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

//Home route
app.get("/", (req, res) => {

  const intro = `<h1>Welcome to our Shop!</h1>
        <p>Check out our <a href="/products">Products List</a></p>
        <p>Or login <a href="/login">here</a></p>
        <p>Don't have an account? Please signup <a href="/signup">here</a></p>`;
  res.send(intro)
});

app.get("/products", (req, res) => {
  res.json(productsList);
});