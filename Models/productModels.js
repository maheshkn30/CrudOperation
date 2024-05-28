const mongoose = require("mongoose");

// creating ProductSchema
const productSchema = mongoose.Schema(
  {
    name: {
      type: String, // defining datatype
      required: [true, "Enter the name"],
    },
    qunatity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
