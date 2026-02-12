const express = require("express");
const mongoose = require("mongoose");
const Product = require("./Models/productModels");
const app = express();

// Middleware
app.use(express.json()); //defines which format to u use

// Routes
app.get("/", function (req, res) {
  res.send("App is Up");
});

//Send data to database (CREATE)
app.post("/product", async function (req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get data from databases (READ)
app.get("/product", async function (req, res) {
  try {
    const product = await Product.find({}); //empty to get all products
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get single product by id (READ)
app.get("/product/:id", async function (req, res) {
  //<-we give id
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
// Update pr edit in database (UPDATE)
app.put("/product/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we can't find product in database
    if (!product) {
      return res.status(404).json({ message: "cannot find product by id" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete products by id (DELETE)
app.delete("/product/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    // if NO product in database
    if (!product) {
      return res.status(404).json({ message: "cannot find product by id" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//connecting database
mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(function () {
    app.listen(3000, function () {
      console.log("Node Api running sucessfully ");
    });
    console.log("mongoose connected");
  })
  .catch(function (err) {
    console.log(err);
  });
